import Link from "next/link";
import { ShieldAlert, AlertTriangle, Scale, Mail, Globe, Clock, Building2, FileCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | CapitalMarketHub",
  description: "Terms and Conditions and Client Agreement for CapitalMarketHub Global Limited",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0d14] text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-[#111622] border border-gray-800 rounded-2xl p-8 sm:p-10 mb-10 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <Scale className="w-3.5 h-3.5" />
            Legal & Regulatory Documentation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            CapitalMarketHub Terms and Conditions
          </h1>
          <p className="text-sm text-gray-400">
            Official Client Agreement &bull; CapitalMarketHub Global Limited
          </p>

          {/* Important Notice Callout */}
          <div className="mt-8 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-sm leading-relaxed">
            <div className="flex items-center gap-2 font-semibold text-amber-400 mb-2 text-base">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              Important — Please Read Carefully
            </div>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) constitute a binding agreement between you (&quot;Client&quot;, &quot;you&quot;, or &quot;your&quot;) and CapitalMarketHub Global Limited (&quot;CapitalMarketHub&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered and operating as an intermediary offering online and offline access to trading in Over-the-Counter (&quot;OTC&quot;) derivative instruments. By registering for an account, accessing our platform, depositing funds, or executing any trade, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree with any provision of these Terms, you must immediately discontinue your use of our platform and services.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed bg-[#111622]/50 border border-gray-800/80 rounded-2xl p-6 sm:p-10">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">1.</span> Eligibility
            </h2>
            <p className="text-gray-300">
              To use the services provided by CapitalMarketHub, you must satisfy all of the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>You must be at least eighteen (18) years of age, or the age of legal majority in your country of residence, whichever is higher.</li>
              <li>You must be legally capable of entering into binding contracts under the laws of your jurisdiction.</li>
              <li>You must not be a Politically Exposed Person (&quot;PEP&quot;) or an individual subject to international sanctions without prior written disclosure and approval from CapitalMarketHub.</li>
              <li>You must not have previously had an account terminated by CapitalMarketHub for violation of these Terms or applicable laws.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              By registering and using our services, you represent and warrant that you meet all eligibility requirements stated above. CapitalMarketHub reserves the right to request proof of identity, age, and residency at any time. Failure to provide such documentation may result in immediate account suspension or termination.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">2.</span> Services Provided
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub operates as an intermediary providing access to online and offline trading in OTC derivative instruments, including but not limited to Contracts for Difference (&quot;CFDs&quot;) on foreign exchange (forex) currency pairs, commodities, indices, equities, and cryptocurrencies. CapitalMarketHub does not provide:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>Investment advice, portfolio management, or financial planning services of any kind.</li>
              <li>Guaranteed returns, profit projections, or any representation that trading will result in profit.</li>
              <li>Custody or safekeeping services for client assets beyond the operational requirements of maintaining trading accounts.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              All trading decisions are made solely by you. CapitalMarketHub acts only as an intermediary facilitating your access to the financial markets and does not act as your financial advisor, broker-dealer, or fiduciary.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">3.</span> Account Registration and Verification
            </h2>
            
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">3.1 Account Creation</h3>
              <p className="text-gray-300">
                To access the full features of our platform, you must register for a trading account. During registration, you agree to provide accurate, complete, and current information including your legal name, email address, phone number, country of residence. You agree to update this information promptly should any details change.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">3.2 Know Your Customer (KYC) Verification</h3>
              <p className="text-gray-300">
                CapitalMarketHub is committed to compliance with anti-money laundering (&quot;AML&quot;) and counter-terrorism financing (&quot;CTF&quot;) regulations. As part of our onboarding process, you may be required to submit the following documentation:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li>A valid government-issued photo identification (passport, national ID card, or driver&apos;s licence).</li>
                <li>Proof of residential address dated within the last three (3) months (utility bill, bank statement, or government-issued correspondence).</li>
                <li>Source of funds documentation where applicable.</li>
              </ul>
              <p className="text-gray-400 text-sm mt-1">
                CapitalMarketHub reserves the right to restrict account functionality, including deposits, withdrawals, and trading, until KYC verification is satisfactorily completed. Incomplete or fraudulent documentation may result in permanent account closure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">3.3 Account Security</h3>
              <p className="text-gray-300">
                You are solely responsible for maintaining the confidentiality of your account credentials, including your password. You agree to notify CapitalMarketHub immediately of any unauthorised access or suspected breach of your account security. CapitalMarketHub shall not be held liable for any loss or damage arising from your failure to protect your account credentials.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">4.</span> Deposits, Payments, and Withdrawals
            </h2>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.1 Payment Processing</h3>
              <p className="text-gray-300">
                All deposits and withdrawals on the CapitalMarketHub platform are processed through our authorised payment partner, shiftshape (or such other payment processors as CapitalMarketHub may designate from time to time). By making a deposit, you agree to be bound by the terms and conditions of the relevant payment processor in addition to these Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.2 Deposit Terms</h3>
              <p className="text-gray-300">
                Deposits are credited to your trading account upon confirmation of receipt by our payment processor. CapitalMarketHub does not guarantee instant crediting and processing times may vary depending on the payment method selected. The minimum deposit amount and accepted currencies are as published on our platform and may be updated at our discretion.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.3 Withdrawal Terms</h3>
              <p className="text-gray-300">
                Withdrawal requests are processed within the timeframes published on our platform, subject to the completion of all applicable KYC verification and compliance checks. Withdrawals will be processed to the same payment method used for the original deposit where possible. CapitalMarketHub reserves the right to request additional verification before processing any withdrawal.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.4 Withdrawal Processing</h3>
              <p className="text-gray-300">
                Upon receiving a withdrawal request, the company shall process the request within 3–5 business days, subject to any delays caused by external factors beyond the company&apos;s control. The company shall notify the investor once the withdrawal has been processed.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.5 Taxation</h3>
              <p className="text-gray-300">
                Withdrawal amounts are subject to applicable taxes as per the prevailing tax regulations. The company shall not deduct the required taxes from the withdrawal amount before processing the payment to the investor.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">4.6 Withdrawal Fees</h3>
              <p className="text-gray-300">
                The company reserves the right to charge reasonable withdrawal fees (either exchange fee or insurance) to cover transaction costs and administrative expenses. Any applicable fees are non-deductible from the withdrawal amount before processing the payment to the investor.
              </p>
            </div>

            {/* 4.7 Critical Loss Callout */}
            <div className="mt-4 p-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200/90 text-sm leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-red-400 mb-2 text-base">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                4.7 No Refund of Traded Losses — THIS IS A CRITICAL PROVISION. PLEASE READ CAREFULLY.
              </div>
              <p>
                Any funds deposited into your trading account and subsequently used for trading are subject to market risk. Losses incurred as a result of trading activity — whether from individual trades, overnight holding costs, swap fees, or any other market-related activity — are final, non-refundable, and non-reversible. CapitalMarketHub does not, under any circumstances, refund trading losses. By depositing funds and placing trades, you accept full and sole responsibility for all outcomes, including the complete loss of your deposited capital.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">5.</span> Risk Disclosure and Limitation of Liability
            </h2>

            {/* 5.1 Risk Warning Callout */}
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-sm leading-relaxed">
              <div className="font-bold text-amber-400 mb-2 text-base">
                5.1 General Risk Warning
              </div>
              <p className="font-medium text-amber-300/90">
                TRADING IN OTC DERIVATIVE INSTRUMENTS, INCLUDING BUT NOT LIMITED TO FOREX, CFDs, COMMODITIES, AND CRYPTOCURRENCIES, CARRIES AN EXTREMELY HIGH LEVEL OF RISK AND IS NOT SUITABLE FOR ALL INVESTORS. YOU COULD SUSTAIN A TOTAL LOSS OF YOUR DEPOSITED FUNDS. DO NOT TRADE WITH MONEY YOU CANNOT AFFORD TO LOSE.
              </p>
              <p className="mt-2 text-gray-300">
                The value of derivative instruments can fluctuate rapidly and unpredictably. Leveraged trading amplifies both potential profits and potential losses. Past performance is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed or illustrated on our platform.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">5.2 Client Responsibility for Trading Decisions</h3>
              <p className="text-gray-300">
                You acknowledge and agree that all trading decisions made through your account are your own. CapitalMarketHub does not make trading decisions on your behalf and bears no responsibility for the outcome of any trade you execute.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">5.3 Limitation of Liability</h3>
              <p className="text-gray-300">
                CapitalMarketHub, its directors, officers, employees, affiliates, agents, and partners shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from or related to:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li>Any trading losses, including total loss of deposited funds.</li>
                <li>Any decisions made based on information, analysis, signals, or educational content provided on our platform.</li>
                <li>Platform downtime, technical failures, connectivity issues, or data feed interruptions.</li>
                <li>Unauthorised access to your account resulting from your failure to maintain account security.</li>
                <li>Actions of third-party payment processors, liquidity providers, or technology partners.</li>
                <li>Force majeure events including but not limited to natural disasters, pandemics, civil unrest, government actions, cyberattacks, or infrastructure failures.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">6.</span> Prohibition of High-Frequency and Automated Trading
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub strictly prohibits the use of any of the following on our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>High-frequency trading (&quot;HFT&quot;) strategies, including but not limited to latency arbitrage, market-making algorithms, and tick-scalping bots.</li>
              <li>Automated trading bots, scripts, Expert Advisors (&quot;EAs&quot;) designed for high-frequency execution, or any software that submits orders without direct manual intervention by the account holder.</li>
              <li>Any form of algorithmic trading that exploits platform latency, price feed delays, or system vulnerabilities.</li>
              <li>Copy trading signals routed through automated execution systems that bypass the platform&apos;s standard order flow.</li>
              <li>Any third-party plugins, extensions, or API exploits not expressly authorised by CapitalMarketHub.</li>
            </ul>

            <div className="space-y-2 pt-2">
              <h3 className="text-base font-semibold text-gray-100">6.1 Consequences of Violation</h3>
              <p className="text-gray-300">
                Any trading account found to be engaging in prohibited automated trading activity will be subject to the following enforcement actions at CapitalMarketHub&apos; sole discretion:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li>Immediate and permanent blocking of the trading account without prior notice.</li>
                <li>Forfeiture of all trading profits derived from the use of automated systems.</li>
                <li>Reversal of any pending withdrawal requests associated with profits generated through prohibited activity.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">7.</span> Acceptable Use of the Platform
            </h2>
            <p className="text-gray-300">
              You agree to use the CapitalMarketHub platform solely for lawful purposes and in accordance with these Terms. You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>Use the platform in violation of any applicable local, national, or international law or regulation.</li>
              <li>Engage in fraudulent, deceptive, or manipulative trading practices, including but not limited to wash trading, spoofing, and layering.</li>
              <li>Attempt to interfere with, disrupt, or compromise the operation, security, or integrity of the platform.</li>
              <li>Upload, transmit, or distribute harmful code, malware, viruses, or any material that could damage the platform or its users.</li>
              <li>Use another person&apos;s identity or credentials to access the platform.</li>
              <li>Open multiple accounts for the purpose of circumventing trading limits, promotional conditions, or these Terms.</li>
              <li>Engage in arbitrage exploitation of pricing errors, system glitches, or delayed price feeds.</li>
              <li>Use the platform for money laundering, terrorism financing, or any other illicit financial activity.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">8.</span> Bonuses, Promotions, and Incentives
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub may, from time to time, offer deposit bonuses, trading credits, cashback programmes, or other promotional incentives. All such promotions are subject to their own specific terms and conditions, which will be published alongside the promotion.
            </p>
            <p className="text-gray-300 font-medium">General rules applicable to all promotions:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>Bonus funds are not withdrawable unless expressly stated otherwise in the specific promotion terms.</li>
              <li>Trading volume requirements must be met before bonus-related profits can be withdrawn.</li>
              <li>CapitalMarketHub reserves the right to modify, suspend, or terminate any promotion at any time without prior notice.</li>
              <li>Abuse of promotional offers, including but not limited to opening multiple accounts to claim bonuses, will result in forfeiture of all bonus funds and may lead to account termination.</li>
              <li>Bonuses are offered at CapitalMarketHub&apos; sole discretion and do not constitute a contractual obligation.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">9.</span> Intellectual Property
            </h2>
            <p className="text-gray-300">
              All content and materials available on the CapitalMarketHub platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the overall design and arrangement of the platform, are the exclusive property of CapitalMarketHub.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">10.</span> Third-Party Services
            </h2>
            <p className="text-gray-300">
              Our platform may incorporate or provide access to third-party services, including but not limited to payment processors (Shiftshape).
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">11.</span> Privacy and Data Protection
            </h2>
            <p className="text-gray-300">
              Your use of our services is governed by our Privacy Policy, which is incorporated into these Terms by reference. The Privacy Policy explains how we collect, process, store, and protect your personal data. By using the platform, you consent to the collection and use of your data as described in the Privacy Policy.
            </p>
            <p className="text-gray-300">
              CapitalMarketHub will not sell or share your personal data with third parties for marketing purposes without your explicit consent.
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">11.1 Professional Standards</h3>
              <p className="text-gray-300">
                CapitalMarketHub representatives are expected to communicate accurately and professionally; avoid misleading or exaggerated claims concerning trading performance; protect confidential client and company information; follow established operational procedures; clearly distinguish factual company information from opinions, projections, or performance expectations; and escalate complaints, account disputes, and unusual requests through appropriate channels.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-100">11.2 Client Information &amp; Verification</h3>
              <p className="text-gray-300">
                Certain company information may be available publicly, while other information may be considered internal or confidential. CapitalMarketHub may restrict disclosure of internal operational procedures, private employee information, security-related information, confidential business processes, non-public financial or technical information, and internal leadership communications. Requests for information may therefore be reviewed before disclosure.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">12.</span> Indemnification
            </h2>
            <p className="text-gray-300">
              You agree to indemnify, defend, and hold harmless CapitalMarketHub, its directors, officers, employees, affiliates, agents, and partners from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or related to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
              <li>Your use of the platform and services.</li>
              <li>Your breach of any provision of these Terms.</li>
              <li>Your violation of any applicable law, regulation, or third-party right.</li>
              <li>Any trading activity conducted through your account, whether authorised or unauthorised.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">13.</span> Account Suspension and Termination
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub reserves the right to suspend, restrict, or permanently terminate your access to the platform at any time, with or without prior notice, if we reasonably believe that:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
              <li>You have violated any provision of these Terms.</li>
              <li>You have engaged in fraudulent, illegal, or suspicious activity.</li>
              <li>Your account is being used for money laundering or terrorism financing.</li>
              <li>You have provided false, misleading, or incomplete information during registration or verification.</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Upon termination, all open positions may be closed at the prevailing market price, and any remaining balance (net of applicable fees and obligations) will be sent to you through the original payment method.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">14.</span> Dispute Resolution
            </h2>
            <p className="text-gray-300">
              Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall first be submitted to CapitalMarketHub&apos; internal complaints procedure by contacting{" "}
              <a href="mailto:support@CapitalMarketHub.co" className="text-blue-400 underline hover:text-blue-300">
                support@CapitalMarketHub.co
              </a>
              . CapitalMarketHub will use reasonable efforts to resolve complaints within thirty (30) business days.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">15.</span> Modifications to These Terms
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub reserves the right to amend, modify, or replace these Terms at any time at its sole discretion. Material changes will be communicated to you by email or by publishing a notice on the platform at least fourteen (14) days before the changes take effect. Your continued use of the platform after the effective date of any modifications constitutes your acceptance of the updated Terms. If you do not agree with any modification, you must discontinue use of the platform and close your account.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">16.</span> Force Majeure
            </h2>
            <p className="text-gray-300">
              CapitalMarketHub shall not be liable for any failure or delay in performing its obligations under these Terms to the extent that such failure or delay is caused by circumstances beyond its reasonable control, including but not limited to: natural disasters, war, terrorism, pandemics, civil unrest, government actions or sanctions, power failures, internet outages, cyberattacks, exchange or market suspensions, or failures of third-party service providers.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">17.</span> Severability
            </h2>
            <p className="text-gray-300">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed severed from these Terms, and the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">18.</span> Entire Agreement
            </h2>
            <p className="text-gray-300">
              These Terms, together with our Privacy Policy, Risk Disclosure Statement, and any applicable promotion-specific terms, constitute the entire agreement between you and CapitalMarketHub with respect to the use of the platform and supersede all prior agreements, understandings, negotiations, and discussions, whether oral or written.
            </p>
          </section>

          {/* Section 19: Contact Information */}
          <section className="space-y-4 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">19.</span> Contact Information
            </h2>
            <p className="text-gray-300">
              If you have any questions, concerns, or complaints regarding these Terms or our services, please contact us at:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-[#0a0d14] border border-gray-800 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Company</div>
                  <div className="text-sm font-semibold text-white">CapitalMarketHub Global Limited</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0a0d14] border border-gray-800 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email Support</div>
                  <a href="mailto:support@CapitalMarketHub.co" className="text-sm font-semibold text-blue-400 hover:underline">
                    support@CapitalMarketHub.co
                  </a>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0a0d14] border border-gray-800 flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Website</div>
                  <div className="text-sm font-semibold text-white">CapitalMarketHub.co</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0a0d14] border border-gray-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Support Hours</div>
                  <div className="text-sm font-semibold text-white">Monday – Saturday, 9:00 AM – 6:00 PM (WAT)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Acknowledgment and Acceptance Card */}
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 text-gray-200 text-sm leading-relaxed mt-8">
            <div className="flex items-center gap-2 font-bold text-blue-400 mb-3 text-base">
              <FileCheck className="w-5 h-5 flex-shrink-0" />
              Acknowledgment and Acceptance
            </div>
            <p>
              By registering for an CapitalMarketHub account, depositing funds, or placing any trade on our platform, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. You further acknowledge that trading in OTC derivatives involves substantial risk of loss and that you are trading at your own risk with funds you can afford to lose. CapitalMarketHub does not guarantee the preservation of your capital, and all trading losses are your sole responsibility.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} CapitalMarketHub Global Limited. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}
