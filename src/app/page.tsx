import Accordion from "@/components/accordion";
import Header from "@/components/header";
import Image from "next/image";
import { CgArrowLongUpR } from "react-icons/cg";
import { BsQuestionLg } from "react-icons/bs";

export default function Home() {
  const accordionList = [
    {
      question: "What is Capital Market Hub?",
      answer:
        "Capital Market Hub is a multi-regulated global forex and shares broker that provides a trading and investment platform for cryptocurrencies, stocks, and CFDs.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Get Started' button on our homepage and following the registration process.",
    },
    {
      question: "What trading instruments are available?",
      answer:
        "We offer a wide range of trading instruments including major, minor, and exotic currency pairs, global stocks, popular cryptocurrencies, and CFDs on various assets.",
    },
    {
      question: "Is my money safe with Capital Market Hub?",
      answer:
        "Yes, we are a regulated broker and prioritize the safety and security of our clients' funds. We use advanced technology to ensure secure transactions.",
    },
    {
      question: "What customer support options are available?",
      answer:
        "We offer 24/7 customer care support to assist you with any queries or issues you may have.",
    },
  ];

  return (
    <>
      <Header />
      <main className="">
        <section className="flex items-center justify-center gap-4 bg-blue-900 h-screen pt-30">
          <div className="max-w-2xl">
            <h1 className="text-white text-6xl font-bold">
              Multi-regulated Global Forex and Shares Broker
            </h1>
            <p className="text-white text-lg max-w-2xl mt-8 mb-4">
              Regulated Trading & Investment platform for cryptocurrencies,
              Stocks, CFD that standarizes data & operations with blockchain
              technology. We provide user-friendly, efficient and secure trading
              & investment solutions utilizing blockchain technology.
            </p>
            <button className="bg-red-600 text-white px-12 py-4 rounded-lg">
              Get Started
            </button>
          </div>{" "}
          <div className="max-w-2xl">
            <Image
              src="/images/hero-image.png"
              alt="Hero Image"
              width={800}
              height={400}
              priority
            />
          </div>
        </section>
        <section className="flex items-center justify-center gap-4 h-[80vh]">
          <div className="max-w-2xl">
            <h2 className="text-black text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-black text-lg max-w-2xl mt-8 mb-4 leading-loose">
              We are committed to providing our clients with the best trading
              experience possible. Our platform is designed to be user-friendly,
              efficient, and secure. We offer a wide range of trading
              instruments, including cryptocurrencies, stocks, and CFDs. Our
              team of experienced professionals is dedicated to helping our
              clients succeed in the financial markets.
            </p>
            <button className="bg-blue-900 text-white px-12 py-4 rounded-lg">
              Get Started &gt;
            </button>
          </div>{" "}
          <div className="max-w-2xl pt-52">
            <ul className="text-black text-lg flex flex-col gap-2 list-none">
              <li>
                &#9653; Customer care support available 24/7 to assist you with
                any queries or issues.
              </li>
              <li>
                &#9653; Fast and secure transactions powered by advanced
                technology.
              </li>
              <li>
                &#9653; Enjoy low fees and tight spreads, maximizing your
                potential returns and minimizing trading costs.
              </li>
              <li>
                &#9653; Access advanced trading tools and analytics designed to.
                and optimize your strategies.
              </li>
              <li>
                &#9653; Trade on a regulated and secure platform that
                prioritizes your safety.
              </li>
            </ul>
          </div>
        </section>
        <section className="px-20 gap-4 min-h-[60vh] bg-slate-50 py-10">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <div className="flex justify-center items-center h-full mt-20">
            <ul className="text-black text-lg flex flex-col gap-8 justify-center items-center list-none px-8 max-w-5xl">
              <div className="flex justify-center items-center gap-8 text-center">
                <li className="flex justify-center items-center flex-col gap-5">
                  &#9653;{" "}
                  <strong className="text-blue-700">Forex Trading:</strong>
                  Trade major, minor, and exotic currency pairs with competitive
                  spreads and leverage options.
                  <CgArrowLongUpR className="text-red-500 text-center text-6xl mx-auto" />
                </li>
                <li className="flex justify-center items-center flex-col gap-5">
                  &#9653;{" "}
                  <strong className="text-blue-700">Stock Trading:</strong>{" "}
                  Access a wide range of global stocks and shares, including
                  popular indices and ETFs.
                  <CgArrowLongUpR className="text-red-500 text-center text-6xl mx-auto" />
                </li>
              </div>
              <div className="flex justify-center items-center gap-5 text-center">
                <li className="flex justify-center items-center flex-col gap-5 w-full">
                  &#9653;{" "}
                  <strong className="text-blue-700">
                    Cryptocurrency Trading:
                  </strong>{" "}
                  Buy and sell popular cryptocurrencies like Bitcoin, Ethereum,
                  and more with ease.
                  <CgArrowLongUpR className="text-red-500 text-center text-6xl mx-auto" />
                </li>
                <li className="flex justify-center items-center flex-col gap-5 w-full">
                  &#9653;{" "}
                  <strong className="text-blue-700">CFD Trading:</strong> Trade
                  Contracts for Difference (CFDs) on various assets, including
                  commodities, indices, and more.
                  <CgArrowLongUpR className="text-red-500 text-center text-6xl mx-auto" />
                </li>
              </div>
            </ul>
          </div>
        </section>
        <section className="px-20 gap-4 min-h-[80vh] py-10">
          <div className="">
            <h2 className="text-black text-4xl font-bold">How It Works</h2>
            <p className="text-black text-lg mt-8 mb-4 leading-loose">
              Our platform is designed to provide a seamless trading experience.
              Here&apos;s how it works:
            </p>
            <ol className="list-decimal list-inside flex items-center justify-center gap-4">
              <li className="flex justify-center items-center border max-w-xl p-5">
                <p>
                  <strong>Sign Up:</strong> Create an account in minutes and
                  verify your identity.
                </p>
                <Image
                  src="/images/register.png"
                  alt="Sign Up"
                  width={200}
                  height={80}
                  className="rounded-lg"
                />
              </li>
              <li className="mb-2 flex justify-center items-center border max-w-xl p-5">
                <p>
                  <strong>Fund Your Account:</strong> Deposit funds using
                  various payment methods.
                </p>
                <Image
                  src="/images/choose_a_plan.png"
                  alt="Sign Up"
                  width={200}
                  height={80}
                  className="rounded-lg"
                />
              </li>
              <li className="flex justify-center items-center border max-w-xl p-5">
                <p>
                  <strong>Start Trading:</strong> Access our trading platform
                  and start trading a wide range of instruments.
                </p>
                <Image
                  src="/images/deposit.png"
                  alt="Sign Up"
                  width={200}
                  height={80}
                  className="rounded-lg"
                />
              </li>
            </ol>
          </div>
        </section>
        <section>
          <div className="bg-blue-900 text-white text-center p-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Join thousands of traders and investors who trust us for their
              trading needs.
            </p>
            <button className="bg-red-600 text-white px-12 py-4 rounded-lg">
              Sign Up Now
            </button>
          </div>
        </section>
        <section className="flex items-center py-20 gap-4 min-h-[80vh] flex-col">
          <div className="max-w-3xl flex flex-col gap-4 text-center items-center">
            <span className="bg-green-200 flex justify-center items-center text-xs p-2 rounded-lg text-green-700">
              FAQ QUESTION <BsQuestionLg className="text-red-500" />
            </span>
            <h2 className="text-3xl">Frequently Asked Questions</h2>
            <p className="px-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <Accordion accordionList={accordionList} />
          </div>
        </section>
        <section className="px-20 gap-4 min-h-[60vh] bg-slate-50 py-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold">Contact Us</h2>
            <p className="text-black text-lg max-w-2xl mt-8 mb-4 leading-loose">
              Have questions or need assistance? Our support team is here to
              help. Reach out to us via email, phone, or live chat.
            </p>
            <ul className="text-black text-lg flex flex-col gap-2 list-none">
              <li>&#9653; Email: support@capitalmarkethub.com</li>
              <li>&#9653; Phone: +1 (800) 123-4567</li>
              <li>&#9653; Live Chat: Available on our website</li>
            </ul>
          </div>
        </section>
        <footer>
          <div className="bg-black text-white text-center p-10">
            <p className="text-lg">
              &copy; 2024 Capital Market Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
