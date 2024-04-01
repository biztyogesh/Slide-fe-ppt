import MenuCard from "components/MenuCardComponent/MenuCard";
import { cardDetails } from "utils/CardDetails";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const renderCards = ({title , desc , svg , link}:any) => {
    const handleOnclick = () => {
    navigate(link)
    }
    return <MenuCard title={title} desc={desc} svg={svg} onClick={handleOnclick}/>
  }

  return (
    <div className='flex flex-row flex-justify-center flex-align-center flex-wrap height-100 dashboard-wrapper'>
      {cardDetails.map(renderCards)}
    </div>
  )
}

export default Dashboard;