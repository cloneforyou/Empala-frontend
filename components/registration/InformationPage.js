import NavButtons from './NavButtons';

const InformationPage = () => (
<div className='information-container'>
  <div className='information-text'>
    <p className='information-title'>IMPORTANT INFORMATION</p>
    <p className='information-text__par1'>PLEASE CAREFULLY REVIEW OUR FEES WHICH CAN BE FOUND ON OUR <ins>EMPALA FEES</ins> PAGE.<br/>
      EMPALA DOES NOT MARK UP ANY FEES.  EMPALA PASSES THROUGH TO MEMBERS VARIOUS EXECUTION,<br/>
      CLEARING, REGULATORY AND OTHER CHARGES INCURRED OR REVENUES RECEIVED FROM ACCOUNT<br/>
      POSITIONS AND ACTIVITY.</p>
    <p className='information-text__par2'>EMPALA CHARGES A FIXED ANNUAL FEE ON EACH CLIENT’S ACCOUNT.<br/>
      THE FEE IS COLLECTED ON A MONTHLY BASIS AS ONE TWELFTH OF THE ANNUAL FEE APPLIED TO THE AVERAGE<br/>
      DAILY VALUE OF THE ACCOUNT IN THE RESPECTIVE MONTH.</p>

    <p className='information-text__par3'>THE ANNUAL FEE AT THIS TIME IS:</p>
    <strong>0.25%</strong>
    <p className='information-text__par4'>We kindly ask for your understanding with regards to our account minimums.  Empala’s minimal fees result in extremely thin operating margins<br/>
      and so it is necessary to have certain account minimums in order to to fully cover costs.  You will need to fund this account within 30 days<br/>
      and Empala will require a $50,000 minimum in total  deposits for your account to go live.</p>
    <p className='information-text__par5'>You will also need to maintain a $25,000 minimum account value to stay live (you will continue to be able to
      close out positions if you have less than $25,000)</p>
  </div>
  <NavButtons />
</div>
);

export default InformationPage;