// src/FAQ.js
import React, { useState } from "react";
import "./faq.css";
import "./download.png";
const Faq = () => {
  const faqData = [
    {
      question: "What is Car Loan Website?",
      answer:
        "Our Smart Finance is an one-stop solution for all customer financing needs. Its an end to end digital auto financing platform where the customer can view, compare and apply for a loan of their choice. The customer can also derive his on-road price (by selecting accessories, insurance etc. as per the need) and track the loan application in real time. Smart Finance is India’s first Online and end to end car finance platform providing an easy and convenient car financing solution to the Car buyer.",
    },
    {
      question: "Is the platform only for salaried customers?",
      answer:
        "The platform is catering to all profiles of customers :Salaried, Self Employed (Income proof) and Self Employed (without income proof)",
    },
    {
      question: "How many cities are covered under Your Website?",
      answer:
        "The platform is available to customers across India and the customer can avail finance from anywhere as the process is completely online.",
    },
    {
      question: "What are the conditions or prerequisites for loan approval?",
      answer:
        "1) If your monthly income is below One Lakh then, Your Cibil score should be 700 or greater than 700 for loan   2)If your monthly income is greater than One Lac, then Cibil score should not consider, We will give you approval but you have to provise proof i.e. salary slip or income proof etc.. ",
    },
    {
      question:
        "Are the offers competitive compared to other online marketplaces?",
      answer:
        "Yes, Offer will be competitive v/s the other online Marketplaces. However, there might be some change in the overall car loan pricing, as banks typically have less overheads and cost with regard to direct customer channels.",
    },
    {
      question: "What is the advantage of applying for a loan online?",
      answer:
        "There are various advantages for online application; Online loan application will give the customer the chance to view all available Finance offers in one single page before selecting the one that is best for them. Also, it is a hassle-free journey with document upload and online sanction letter facility. All this comes with complete transparency of fee and charges.",
    },
    {
      question: "Are my documents safe?",
      answer:
        "All documents are kept secure on the platform. Please refer to the privacy policy for more details.",
    },

    {
      question:
        "Can the customer enter an email/phone that is not linked to their Bank Account?",
      answer:
        "To get the best deals on car finance and for proper verification of loan application, it is recommended that the customer shares the correct details which are available with the bank. Please also ensure that the details (email, phone number etc.) match the documents provided",
    },

    // Add more FAQ items here
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse the selected question
    } else {
      setExpandedIndex(index); // Expand the selected question
    }
  };

  return (
    <div className="faq">
      <h2 className="heading">FAQ with short answers</h2>
      <ul>
        {faqData.map((item, index) => (
          <li key={index} className={expandedIndex === index ? "expanded" : ""}>
            <button onClick={() => toggleAnswer(index)}>
              {item.question} {expandedIndex === index ? "▲" : "▼"}
            </button>
            <br></br>
            {expandedIndex === index && <p>{item.answer}</p>}
          </li>
        ))}
      </ul>
      {/* <div>
        <img src="./download.png" alt="images" />
      </div> */}
    </div>
  );
};

export default Faq;
