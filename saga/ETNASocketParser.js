import { takeEvery, all, take, select, put, call, race, fork, spawn } from 'redux-saga/effects';
import {
  GET_ETNA_DATA,
  GET_ORDERS_LIST,
  GET_USER_DATA_REQUEST,
  LOGOUT, SUBSCRIBE_QUOTES, SUBSCRIBE_WATCHLIST_CONTENT, UNSUBSCRIBE_QUOTES,
} from '../constants/dashboard';
import { serverOrigins } from '../utils/config';
import { eventChannel } from 'redux-saga';
import {
  modifyPosition,
  setOrdersList,
  setParsedPositions,
  setPositions,
  setWatchLists,
  updateOrders,
  updateWatchlist,
  updateQuotes,
} from '../actions/dashboard';
import { calculateOrderDistance, calculateOrderPrice, parseOrderDate } from '../utils/dashboardUtils';
import { selectETNADataRequest } from './dashboard';

/* ===== NOT USED NOW BUT MAYBE WILL NEED BE MODIFIED AND APPLIED FURTHER  ===== */

export const parseOrdersList = list => list.map(order => ({
  id: Math.random(),
  // sec_name: order.Name,
  sec_name: order.SymbolDescription,
  symbol: order.Symbol,
  // date: parseOrderDate(order.Date),
  currency: order.SecurityCurrency,
  price: calculateOrderPrice(order.AveragePrice, order.Quantity),
  order_quantity: order.Quantity,
  fill_quantity: order.ExecutedQuantity,
  remain_quantity: order.LeavesQuantity,
  notional_ammount: '--', // TODO find the way how to calculate
  comission: '--', // TODO find the way how to calculate
  distance: calculateOrderDistance(order.AveragePrice, order.LastPrice),
  start_date: parseOrderDate(order.CreateDate),
  qct: '--', // TODO Investigate how to calculate

}));

export const parseWatchList = list => ({
  id: list.Id,
  name: list.Name,
  type: list.Type,
  content: list.SecurityList.map(position => (
    {
      id: Math.random(),
      sec_name: position.Description,
      symbol: position.Symbol,
      // date: parseOrderDate(position.AddedDate),
      currency: position.Currency,
      last_p: '--', // TODO where could be find
      bid_sz: '--', // TODO where could be find
      bid: '--', // TODO where could be find
      off: '--', // TODO where could be find,
      off_size: position.ContractSize, // not sure about this
      day_volume: '--', // TODO where could be find,
      sentiment: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      esch: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      pe_ratio: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      secID: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      rating: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
    }
  )),
});

export const parsePositionsList = list => (list.map(pos => ({
  id: { value: Math.random(), attr: '' },
  start_date: { value: parseOrderDate(pos.CreateDate).slice(0, 10), attr: '' },
  symbol: { value: pos.Symbol, attr: '' },
  sec_name: { value: pos.CompanyName, attr: '' },
  sec_id: { value: pos.SecurityId, attr: '' },
  category: { value: pos.SecurityType, attr: '' },
  country: { value: 'USA', attr: '' }, // For Phase 1 - default Country of Settlement to USA (TODO: needs to be modifed once we trade in Europe)
  currency: { value: pos.SecurityCurrency, attr: '' },
  ann_cf: { value: '--', attr: '' }, // TODO investigate about calculation
  carry: { value: '--', attr: '' }, // This is the total CF dividend and interest on this postions from it's inception - Not Used in Phase 1
  ann_ret: { value: '--', attr: '' }, // TODO investigate about calculation (1+Positions.PortfolioPositions.Total%Ch)^(today-Positions.PortfolioPositions.StartDate)/365.25)-1
  var_cont: { value: '--', attr: '' }, // This is the Value at Risk contributed to the overall portfolio - Not Used in Phase 1
  avg_price: { value: pos.AverageOpenPrice, attr: '' }, // should it be avg open or close price?
  quantity: { value: pos.Quantity, attr: '' },
  m2m: { value: '--', attr: '' }, // This is the last price (or previous close if market closed) from our live data feed TODO: investigate source this data
  notional: { value: '--', attr: '' }, // QuantityxPositions.PortfolioPositions.M2M
  total_chg: { value: '--', attr: '' }, // (Positions.PortfolioPositions.M2M-Positions.PortfolioPositions.AvePrice)/Positions.PortfolioPositions.AvePrice*100
  total_pl: { value: '--', attr: '' }, // This is the Total P&L including all components such as carry and M2M - Not Used in Phase 1
  day_chg: { value: '--', attr: '' }, // TODO investigate about calculation
  day_pl: { value: '--', attr: '' }, // TODO investigate about calculation
})));

const modifyPositions = (positionsList, position) => {
  const index = positionsList.findIndex(pos => pos.sec_id === +position.Key);
  if (index) {
    positionsList[index] = {
      ...positionsList[index],
      m2m: position.Last,
      day_chg: position.ChangePc,
    };
  }
  return positionsList.slice(0);
};


/* ----------- SOCKET HANDLING FUNCTIONS ------------ */

function* internalListener(socket) {
  const subscribe = (quoteKey, sessionId) => socket.send(JSON.stringify({
    Cmd: 'Subscribe.txt',
    SessionId: sessionId,
    Keys: quoteKey,
    EntityType: 'Quote',
  }));
  const unsubscribe = (quoteKey, sessionId) => socket.send(JSON.stringify({
    Cmd: 'Unsubscribe.txt',
    SessionId: sessionId,
    Keys: quoteKey,
    EntityType: 'Quote',
  }));
  while (true) {
    // const data = yield take('EXE_COMMAND');
    const quotes = yield take(SUBSCRIBE_QUOTES);
    const activePage = yield select(state => state.dashboard.activePageDashboard);
    // const sessionId = yield select(state => state.dashboard.sessionId);
    const sessionQuotesId = yield select(state => state.dashboard.sessionQuotesId);
    let quotesKeys = [];
    if (activePage === 'positions') {
      quotesKeys = yield select(state => state.dashboard.parsedPositions.map(pos => pos.sec_id));
      console.log('Subscribe for positions', quotesKeys);
    } else if (activePage === 'orders') {
      const activeWatchlistNumber = yield select(state => +state.dashboard.watchListNumber);
      quotesKeys = yield select(state => state.dashboard.parsedWatchLists[activeWatchlistNumber].content.map(pos => pos.secID));
      console.log('Subscribe for orders', quotesKeys);
    }
    quotesKeys.forEach(key => subscribe(key, sessionQuotesId));
    const quotesUnsubcribe = yield take(UNSUBSCRIBE_QUOTES);
    quotesKeys.forEach(key => unsubscribe(key, sessionQuotesId));
    const watchlistContent = yield take(SUBSCRIBE_WATCHLIST_CONTENT);
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    console.log('acttt ======>', action);
    if (action.type === 'quote') {
      if (action.item.Cmd === 'CreateSession.txt' && action.item.SessionId) {
        yield put({ type: 'SET_SESSION_ID', id: action.item.SessionId, name: 'quote' });
      }
      // const parsedPositions = yield select(state => state.dashboard.parsedPositions);
      // yield put(setParsedPositions(modifyPositions(parsedPositions, action.item)));
      if (action.item.Cmd !== 'Subscribe.txt' && action.item.Cmd !== 'Unsubscribe.txt' && action.item.Cmd !== 'CreateSession.txt') {
        yield put(updateQuotes(action.item));
      }
    }
    yield put({ type: 'SET_SESSION_ID', id: action.item.SessionId, name: 'orders' });
    if (!action.item.Cmd && action.item.EntityType === 'Order') {
      yield put(updateOrders(action.item));
    }
    if (!action.item.Cmd && action.item.EntityType === 'Watchlist') {
      console.log('wwwwwwliiiiiisttt');
      yield call(selectETNADataRequest, { payloadType: 'watch_lists' });
    }
    if (!action.item.Cmd && action.item.EntityType === 'WatchlistContent') {
      yield put(updateWatchlist(action.item));
    }
  }
}

function watchQuotes(socket, params) {
  return eventChannel((emit) => {
    socket.onopen = (i) => {
      console.log('------------> OPEN', i);
      console.log('------------> REQ', params);
      // socket.send(JSON.stringify(request)); // Send data to server
    };
    socket.onmessage = (event) => {
      // console.log('msssg', event)
      const msg = JSON.parse(event.data);
      // console.log('===> msssg', msg)
      if (msg.Cmd === 'CreateSession.txt' && msg.SessionId) {
        console.log('WS SessionId:', msg.SessionId);
      }
      if (msg.Cmd !== 'Ping') emit({ item: msg, type: 'quote' });
    };
    return () => {
      socket.close();
    };
  });
}

function watchMessages(socket, params) {
  return eventChannel((emit) => {
    socket.onopen = (i) => {
      console.log('------------> OPEN', i);
      console.log('------------> REQ', params);
      // socket.send(JSON.stringify(request)); // Send data to server
    };
    socket.onmessage = (event) => {
      // console.log('msssg', event)
      const msg = JSON.parse(event.data);
      // console.log('===> msssg', msg)
      if (msg.Cmd === 'CreateSession.txt' && msg.SessionId) {
        console.log('WS SessionId:', msg.SessionId);
        // socket.send(JSON.stringify({ ...params, SessionId: msg.SessionId, Keys: 166 }));
        return params.EntityType.forEach(type => socket.send(JSON.stringify({
          ...params,
          EntityType: type,
          SessionId: msg.SessionId,
          Keys: type === 'Order' ? params.Credentials.accountId : params.Credentials.userId,
        })));
      }
      if (msg.Cmd !== 'Ping') emit({ item: msg });
    };
    return () => {
      socket.close();
    };
  });
}

function* wsHandling() {
  while (true) {
    const data = yield take('START_WEBSOCKET');
    const ETNACredentials = yield select(state => (
      state.dashboard.userData ? state.dashboard.userData.data.etna_credentials : {}));
    console.log('==>', ETNACredentials);
    const query = `User=${ETNACredentials.userId}:${ETNACredentials.dataSessionId}&Password=${ETNACredentials.dataSessionId}&HttpClientType=WebSocket`;
    const queryQuote = `User=${ETNACredentials.userId}:${ETNACredentials.quoteSessionId}&Password=${ETNACredentials.quoteSessionId}&HttpClientType=WebSocket`;
    const params = {
      Cmd: 'Subscribe.txt',
      SessionId: '',
      EntityType: ['Order', 'Watchlist'],
      HttpClientType: 'WebSocket',
      Credentials: ETNACredentials,
    };
    // const socket = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    const socketQuotes = new WebSocket(`${ETNACredentials.quoteUrl}/CreateSession.txt?${queryQuote}`);
    const socketData = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    const quotesKeys = yield select(state => (state.dashboard.parsedPositions ? state.dashboard.parsedPositions.map(pos => pos.sec_id) : []));
    console.log(' ** SOCKET', socketQuotes);
    // const socketChannel = yield call(watchMessages, socket, request);
    const quoteChannel = yield call(watchQuotes, socketQuotes, { ...params, keys: quotesKeys, EntityType: 'Quote' });
    const ordersChannel = yield call(watchMessages, socketData, params);
    const { cancel } = yield race({
      task: [
        call(externalListener, ordersChannel),
        call(externalListener, quoteChannel),
        call(internalListener, socketQuotes),
      ],
      cancel: take('STOP_WEBSOCKET'),
    });
    if (cancel) {
      quoteChannel.close();
      ordersChannel.close();
    }
  }
}
/* ----------- SOCKET HANDLING FUNCTIONS END ------------ */

export default function* socketSaga() {
  yield all([
    wsHandling(),
  ]);
}
