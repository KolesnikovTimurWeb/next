import React, { useState, useEffect } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Experts.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useGetAllExpertsClientsQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import Loader from "../../shared/ui/Loader";
import ExpertDesc from "../../pages/ExpertDesc/[id]";

const Experts = () => {

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { data: resultData, isError } = useGetAllExpertsClientsQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
    isError ? setLoading(false) : null;
  }, [resultData]);
  function accordionFunc(item, id) {
    let div = item.target.closest('.div')
    let change = div.querySelectorAll('.active')

    setClick(true);
    setClickButton(false)
    console.log(div)
    change.forEach(element => {
      console.log(element)
      if (element.className.includes(id)) {
        element.style.display = 'block'

      } else {
        element.style.display = 'none'

      }

    });

  }

  const [click, setClick] = useState(true)
  const [clickButton, setClickButton] = useState(true)

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Услуги" currentPage="Эксперты" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  const handleClick = (item) => {
    setClickButton(true);
    console.log(document.querySelector('active'))
    setClick(false);

  };

  return (
    <div className={s.experts}>
      {/* <BackLink menuTitle="Услуги" currentPage="Эксперты" /> */}
      <div className="div">
        {data?.length !== 0 ? (
          data?.map((expert) => (
            <div className={s.accr + " accordion"}>
              {clickButton &&
                <button
                  onClick={(e) => accordionFunc(e, expert.expert_id)}
                  key={expert.expert_id}
                >

                  {expert.title}
                  <Image src={"/tick.png"} width={17} height={17} alt="tick" />
                </button>
              }
              {
                <div className={s.none + " active " + expert.expert_id} >
                  {click && <ExpertDesc valeuClick={handleClick} id={expert.expert_id} />}


                </div>
              }
            </div>
          ))
        ) : (
          <NoInform text="empty" />
        )}
      </div >
    </div >
  );
};

export default Experts;
