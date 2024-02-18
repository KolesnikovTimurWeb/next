import Link from "next/link";
import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./WardsDetail.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "../../shared/ui/Loader";
import { useGetPurchaseQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import {
  useApplyMethodMutation,
  useEditMemberPlanMutation,
  useGetMemberPlanQuery,
  useGetTrainQuery,
} from "../../redux/api";
import Plan from "../Plan/[id]";
import PlanAccordion from "../PlanAccordion/PlanAccordion";
import AnalyticsAccordion from "../AnalyticsAccordion/AnalyticsAccordion";
import QuestionnaireAccordion from "../QuestionnaireAccordion/QuestionnaireAccordion";


const WardsDetail = () => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const { data: resultData, isError } = useGetPurchaseQuery({ token, id }, {
    skip: !token,
  });










  // const [dataPlan, setDataPlan] = useState([]);
  // const [idPlan, setIdPlan] = useState();
  // const [dataMehod, setDataMethod] = useState([]);
  // const [value, setValue] = useState("Выберите метод");
  // const [editMemberPlan] = useEditMemberPlanMutation();
  // const [applyMethod] = useApplyMethodMutation();




  // const [modalState, setModalState] = useState({
  //   target: false,
  //   power: false,
  //   cardio: false,
  //   feed: false,
  //   recovery: false,
  // });

  // const [createDataPlan, setCretaeDataPlan] = useState({
  //   target: "",
  //   power_plan: "",
  //   cardio_plan: "",
  //   feed_plan: "",
  //   recovery_plan: "",
  // });
  // const MyComponent = props => {
  //   const [hookValue, setHookValue] = useState(0);
  //   return (
  //     <div>'asdasdasd</div>
  //   )
  // }
  // const {
  //   resultDataPlan,
  //   isErrorPlan,
  //   refetch,
  // } = useGetMemberPlanQuery(
  //   { token, idPlan },
  //   {
  //     skip: !token,
  //   }
  // );


  const { data: resultDataMethod, refetch: refetchMethod } = useGetTrainQuery(
    token,
    {
      skip: !token,
    }
  );
  function accordionFunc(item, value) {
    let div = item.target.closest('div')
    let button = item.target
    button.classList.toggle(s.buttonact)
    console.log(button)
    if (value === 1) {
      let acc = div.querySelector('.accordion-1')
      console.log(acc.style.display == 'block')
      if (acc.style.display == "block") {
        acc.style.display = 'none'
        return
      }

      acc.style.display = "block"
    }

    if (value === 2) {
      let acc = div.querySelector('.accordion-2')
      console.log(acc.style.display == 'block')
      if (acc.style.display == "block") {
        acc.style.display = 'none'
        return
      }

      acc.style.display = "block"
    }
    if (value === 3) {
      let acc = div.querySelector('.accordion-3')
      console.log(acc.style.display == 'block')
      if (acc.style.display == "block") {
        acc.style.display = 'none'
        return
      }

      acc.style.display = "block"
    }
  }
  // function planFuncsEfffect() {


  //   if (resultDataPlan) {
  //     setDataPlan(resultDataPlan);
  //     setDataMethod(resultDataMethod);
  //     setCretaeDataPlan(...resultDataPlan);
  //     setLoading(false);
  //   }
  //   if (resultDataMethod) {
  //     setDataMethod(resultDataMethod);
  //     refetchMethod();
  //   }
  //   console.log('asd')
  // };
  // function planFuncs(id) {
  //   setIdPlan(id)

  //   planFuncsEfffect()

  //   console.log(dataPlan)


  //   const handleSelectChange = async (value, plans) => {
  //     const planType = {
  //       plan_type: plans,
  //       method_id: value,
  //     };
  //     try {
  //       await applyMethod({
  //         token,
  //         id,
  //         planType,
  //       });
  //       toast.success("Успешно изменено");
  //       await refetch();
  //     } catch (error) {
  //       toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
  //     }
  //   };

  //   const handleOk = async (type) => {
  //     try {
  //       await editMemberPlan({
  //         token,
  //         id,
  //         createData,
  //       });
  //       setModalState({ ...modalState, [type]: false });
  //       toast.success("Успешно изменено");
  //       await refetch();
  //     } catch (error) {
  //       toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
  //     }
  //   };

  //   const handleCancel = (type) => {
  //     setModalState({ ...modalState, [type]: false });
  //   };

  //   const showModal = (type) => {
  //     setModalState({ ...modalState, [type]: true });
  //   };

  //   if (isError) {
  //     return (
  //       <>
  //         <BackLink menuTitle="Группы" currentPage="О группе" />
  //         <NoInform text="error" />
  //       </>
  //     );
  //   }
  // }


  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (isError) {
    return (
      <>
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.wards_detail}>
      <BackLink menuTitle="Покупки" currentPage="Консультация 23.10" />
      {data?.length !== 0 ? (
        <>
          {data.map((purchase) => (
            <div key={purchase.member_id} className={s.wards_detail_goal}>
              <p>
                <span>Услуга:</span> {purchase.title}
              </p>
              <p>
                <span>Покупатель:</span> {purchase.member_name}
              </p>
              <p>
                <span>Дата:</span> {purchase.date_start} -{" "}
                {purchase.date_finish}
              </p>
            </div>
          ))}

          {data.map((purchase) => (
            <div key={purchase.member_id} className={s.wards_detail_links}>
              <button onClick={(e) => accordionFunc(e, 1)} >
                Индивидуальный план
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />


              </button>
              {<div className={s.accordion + " accordion accordion-1"}>
                <PlanAccordion id={purchase.member_id} />
              </div>}
              <button onClick={(e) => accordionFunc(e, 2)}>
                Аналитика
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </button>

              {<div className={s.accordion + " accordion accordion-2"}>
                <AnalyticsAccordion id={purchase.member_id} />
              </div>}
              <button onClick={(e) => accordionFunc(e, 3)}>
                Анкета
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </button>


              {<div className={s.accordion + " accordion accordion-3"}>
                <QuestionnaireAccordion id={purchase.member_id} />
              </div>}

              <a
                href={purchase.chat_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти в чат
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </a>
            </div>
          ))}
        </>
      ) : (
        <>
          <NoInform text="empty" />
        </>
      )
      }
    </div >
  );
};

export default WardsDetail;
