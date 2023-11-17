import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Body/Card/Card";
import Header from "./Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsis,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { MdOutlinePendingActions } from "react-icons/md";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Check if data is null or undefined
  if (!data) {
    return (
      <div className="App">
        <Header />
        <div className="panel-content">Loading...</div>
      </div>
    );
  }

  const uniqueStatusOptions = [
    ...new Set(data["tickets"].map((ticket) => ticket.status)),
  ];

  // Create an array with objects containing status and number of items
  const statusItemsCount = uniqueStatusOptions.map((status) => ({
    status,
    number_of_items: data["tickets"]?.filter(
      (ticket) => ticket.status === status
    )?.length,
  }));

  return (
    <div className="App">
      <Header />
      <div className="panel-content">
        {statusItemsCount.map(({ status, number_of_items }) => (
          <div key={status} className="panel_class">
            <div className="header_panel">
              <div>
                {status === "Todo" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    width="1em"
                    height="1em"
                    fill="orange"
                    className="text-message-warning dark:text-message-warning"
                  >
                    <path d="M6.998 7v-.6a.6.6 0 00-.6.6h.6zm.05 0h.6a.6.6 0 00-.6-.6V7zm0 .045v.6a.6.6 0 00.6-.6h-.6zm-.05 0h-.6a.6.6 0 00.6.6v-.6zm5-.045a5 5 0 01-5 5v1.2a6.2 6.2 0 006.2-6.2h-1.2zm-5 5a5 5 0 01-5-5h-1.2a6.2 6.2 0 006.2 6.2V12zm-5-5a5 5 0 015-5V.8A6.2 6.2 0 00.798 7h1.2zm5-5a5 5 0 015 5h1.2a6.2 6.2 0 00-6.2-6.2V2zm2.2 5a2.2 2.2 0 01-2.2 2.2v1.2a3.4 3.4 0 003.4-3.4h-1.2zm-2.2 2.2a2.2 2.2 0 01-2.2-2.2h-1.2a3.4 3.4 0 003.4 3.4V9.2zM4.798 7a2.2 2.2 0 012.2-2.2V3.6a3.4 3.4 0 00-3.4 3.4h1.2zm2.2-2.2a2.2 2.2 0 012.2 2.2h1.2a3.4 3.4 0 00-3.4-3.4v1.2zm0 2.8h.05V6.4h-.05v1.2zm-.55-.6v.045h1.2V7h-1.2zm.6-.555h-.05v1.2h.05v-1.2zm.55.6V7h-1.2v.045h1.2z" />
                  </svg>
                ) : status === "In progress" ? (
                  <FontAwesomeIcon icon={faSpinner} />
                ) : status === "Backlog" ? (
                  <MdOutlinePendingActions />
                ) : status === "Done" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 12.005v-.828a1 1 0 112 0v.829a10 10 0 11-5.93-9.14 1 1 0 01-.814 1.826A8 8 0 1020 12.005zM8.593 10.852a1 1 0 011.414 0L12 12.844l8.293-8.3a1 1 0 011.415 1.413l-9 9.009a1 1 0 01-1.415 0l-2.7-2.7a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : status === "Done" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="h-4.5 w-4.5 text-lc-green-60 dark:text-dark-lc-green-60 inline-block shrink-0 fill-none stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21.6 12a9.6 9.6 0 01-9.6 9.6 9.6 9.6 0 110-19.2c1.507 0 2.932.347 4.2.965M19.8 6l-8.4 8.4L9 12"
                    />
                  </svg>
                ) : null}
              </div>
              <div>
                <p>{status}</p>
                <span>{number_of_items}</span>
              </div>
              <div>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faEllipsis} />
                </span>
              </div>
            </div>
            <ul>
              {data["tickets"]
                ?.filter((ticket) => ticket.status === status)
                .map((d, i) => {
                  return <Card ticket={d} key={i} />;
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
