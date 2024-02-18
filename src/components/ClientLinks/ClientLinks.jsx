import React, { useState } from "react";
import s from "./ClientLinks.module.scss";
import Link from "next/link";
import Image from "next/image";
import BtnCounter from "../../shared/counter/BtnCounter";
import Experts from "../../pages/Experts/Experts";
import TargetGroups from "../../pages/TargetGroups/TargetGroups";
import QuestionnaireClient from "../../pages/QuestionnaireClient/QuestionnaireClient";

const ClientLinks = () => {
  const [experts, setExperts] = useState(false)
  const [group, setGroup] = useState(false)
  const [client, setClient] = useState(false)


  return (
    <>
      <div className={s.clients_links}>
        <p className={s.clients_link}>Услуги</p>
        <div className={s.clients_transitions}>
          <button onClick={() => setExperts(!experts)}>
            <BtnCounter />
            Эксперты
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />
          </button>
          {experts &&

            <Experts />

          }
          <button onClick={() => setGroup(!group)}>
            <BtnCounter />
            Целевые группы
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />
          </button>
          {group &&

            <TargetGroups />

          }

          <button onClick={() => setClient(!client)}>
            <BtnCounter />
            Моя анкета
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />

          </button>
          {client &&

            <QuestionnaireClient />

          }

          <div className={s.wrapper_img}>
            <Image
              src="/Logo.PNG"
              alt="Logo"
              className={s.img}
              width={320}
              height={300}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default ClientLinks;
