import CountUp from "react-countup";

const InfoCard = ({ index }) => {
  const data = [
    { title: "Earning", amount: 50000 },
    { title: "Spend this month", amount: 20000 },
    { title: "sales", amount: 60000 },
    { title: "Your balance", amount: 100675 },
    { title: "Leads this month", amount: 100 },
    { title: "All Leads", amount: 250 },
  ];
  return (
    <div className="shadow-md rounded-xl bg-white px-6 py-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="bg-theme-blue-light p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-gray-100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div>
          <h2 className="text-semibold text-gray-400">{data[index].title}</h2>
          <h2 className="lg:text-2xl font-bold">
            {index < 4 ? "₹" : ""}
            <CountUp end={data[index].amount} />
          </h2>
          {index % 2 == 0 && (
            <p>
              <span className="text-green-500 text-sm lg:text-md">+23%</span>{" "}
              Since last month
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
