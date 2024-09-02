

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";


const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today")

    const [tv, settv] = useState([])
   const [page, setpage] = useState(1)
   const [hasmore, sethasmore] = useState(true)
   document.title="SMDB | tv" + category.toUpperCase();
   const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length>0) {
        
          settv((previousstate)=>[...previousstate,...data.results]);
          setpage(page+1)
      }else{
        sethasmore(false)

      }
    //   console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler =  () => {
    if(tv.length === 0){
        Gettv();
    }else{
        setpage(1)
         settv([])
         Gettv()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])
 



  return tv.length >0 ? (
    <div className=" px-10 w-screen h-screen ">
      <div className="w-full text-zinc-400   flex  items-center ">
        <h1 className="text-2xl w-[24%] flex  font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-s-fill"
          ></i>{" "}
          Tv shows  
        <h4 className="text-sm ">({category})</h4>
         
        </h1>
        <Topnav />
        
        <Dropdown title="Category" options={["popular","top_rated","on_the_air","airing_today"]} func={(e)=>setcategory(e.target.value)} />
                <div className="w-6"></div>
       
      </div>
       
        <InfiniteScroll
         dataLength={tv.length}
         next={Gettv()}
         hasMore={hasmore}
        loader={<h1>Loading...</h1>}
        >


      <Cards data={tv} title="tv" />
      
      </InfiniteScroll>
    </div>
  ):(
    <Loading/>
  );
};



export default Tvshows