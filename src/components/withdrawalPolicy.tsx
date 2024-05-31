import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';

const WithdrawalPolicy = () => {
  return (
    <Accordion type="single" >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className='font-bold text-lg underline'>Withdrawal Policy</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className='text-sm p-4'>
            <p><strong>Eligibility:</strong></p>
            <p>Withdrawals can only be made by registered users who have successfully completed all necessary verification processes.</p>
            
            <p><strong>Withdrawal Requests:</strong></p>
            <p>Users must submit a withdrawal request through the designated section on our website.</p>
            <p>The minimum and maximum withdrawal amounts will be specified on the withdrawal request page and are subject to change at our discretion.</p>

            <p><strong>Processing Time:</strong></p>
            <p>Withdrawal requests are typically processed within 3-5 business days. However, processing times may vary based on banking procedures and other external factors beyond our control.</p>

            <p><strong>Fees and Charges:</strong></p>
            <p>Any fees associated with the withdrawal process will be clearly stated on the withdrawal request page.</p>
            <p>Users are responsible for any charges levied by their banks or payment processors.</p>

            <p><strong>Limitations and Restrictions:</strong></p>
            <p>We reserve the right to limit the number and amount of withdrawals in a given period to prevent fraud and ensure compliance with regulatory requirements.</p>
            <p>Withdrawals are subject to the availability of funds in the user's account.</p>

            <p><strong>Verification and Compliance:</strong></p>
            <p>We may require additional verification or documentation before processing a withdrawal request to ensure compliance with legal and regulatory obligations.</p>
            <p>Users must provide accurate and truthful information during the withdrawal process.</p>

            <p><strong>Disputes and Resolutions:</strong></p>
            <p>Any disputes related to withdrawals will be handled in accordance with our dispute resolution policy, and users can contact our support team for assistance.</p>

            <p>By using our website and services, you agree to adhere to the terms of our withdrawal policy. We reserve the right to modify or update this policy at any time, and any changes will be communicated to users via our website or other appropriate channels.</p>

            <p>For any questions or concerns regarding our withdrawal policy, please contact our customer support team.</p>

            <p><em>Note: This withdrawal policy is integrated within our overall Terms and Conditions, which govern your use of our website and services. Please review the entire document to understand your rights and obligations fully.</em></p>
            <a className='underline' href='https://merchant.razorpay.com/policy/OEe23tN62CDfsp/terms' target="_blank"> Terms & Conditions</a>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WithdrawalPolicy;
