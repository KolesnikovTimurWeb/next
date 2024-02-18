import React, { useState, useEffect } from "react";
import BackLink from "../../components/BackLink/BackLink";
import { toast } from "react-toastify";
import s from "./AnalyticsAccordion.module.scss";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useRouter } from "next/router";
import {
   useEditMemberMiscMutation,
   useGetMiscTypesQuery,
} from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import UiSelect from "../../shared/ui/UiSelect";
import Image from "next/image";
import SaveBtn from "../../shared/ui/SaveBtn";

const AnalyticsAccordion = (valueId) => {
   const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
   const router = useRouter();
   const id = valueId.id;
   const [token, setToken] = useState(null);
   const [loading, setLoading] = useState(true);
   const [optionsData, setOptionsData] = useState("");
   const [startDate, setStartDate] = useState(dayjs());
   const [endDate, setEndDate] = useState(dayjs());
   const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
   const [misc, setMisc] = useState(null);
   const [pdfUrl, setPdfUrl] = useState(null);
   const [editMemberMisc] = useEditMemberMiscMutation();
   const [loadingContent, setLoadingContent] = useState(false);
   const [isSafari, setIsSafari] = useState(false);

   const { data: resultData, isError } = useGetMiscTypesQuery(token, {
      skip: !token,
   });

   useEffect(() => {
      if (resultData && resultData.length > 0) {
         setOptionsData(resultData);
         setLoading(false);
      }
      if (isError) {
         setLoading(false);
      }
   }, [resultData, isError]);

   useEffect(() => {
      setToken(localStorage.getItem("token"));
   }, []);

   useEffect(() => {
      setLoading(false);

      if (startDate.isAfter(endDate)) {
         setEndDate(startDate);
      }
   }, [startDate, endDate]);

   useEffect(() => {
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(
         navigator.userAgent
      );
      setIsSafari(isSafariBrowser);
   }, []);

   const handleSelectChange = async (selectedValue) => {
      const foundItem = optionsData.find((item) => item.title === selectedValue);

      const type = foundItem ? foundItem.type : null;

      const formattedStartDate = startDate.format("DD/MM/YYYY");
      const formattedEndDate = endDate.format("DD/MM/YYYY");
      const miscData = {
         date_start: formattedStartDate,
         date_finish: formattedEndDate,
         misc_type: type,
      };
      try {
         setLoadingContent(true);
         const res = await editMemberMisc({
            token,
            id,
            miscData,
         });
         setMisc(res.data);
         setPdfUrl(res.data);
         toast.success("Успешно изменено");
         setLoadingContent(false);
      } catch (err) {
         toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
         setLoadingContent(false);
      }
   };

   const handleStartDateChange = (date) => {
      setStartDate(date);
      setOpenEndDatePicker(true);
   };

   const handleEndDateChange = (date) => {
      setEndDate(date);
   };

   if (loading) {
      return <Loader />;
   }

   return (
      <div className={s.analytics}>
         <div className={s.analytics_date}>
            <span>С</span>
            <DatePicker
               className="analytics_date_picker"
               value={startDate}
               onChange={handleStartDateChange}
               format={dateFormatList}
               inputReadOnly
            />
            <span className={s.analytics_date_title}>По</span>
            <DatePicker
               className="analytics_date_picker"
               value={endDate}
               onChange={handleEndDateChange}
               open={openEndDatePicker}
               onOpenChange={(status) => setOpenEndDatePicker(status)}
               format={dateFormatList}
               inputReadOnly
            />
         </div>
         <div className={s.analitycs_links}>
            {optionsData !== "" ? (
               <UiSelect
                  type={"Отчет:"}
                  options={optionsData.map((item) => item.title)}
                  onSelectChange={handleSelectChange}
               />
            ) : null}
         </div>

         {loadingContent ? (
            <Loader />
         ) : (
            <div className={s.img}>
               {misc !== null &&
                  typeof misc === "string" &&
                  misc.endsWith(".png") ? (
                  <div className={s.analitycs_report_received}>
                     <Image width={100} height={100} src={misc} alt="Expert" />
                  </div>
               ) : pdfUrl !== null ? (
                  <div className={s.analitycs_report_received_pdf}>
                     {isSafari ? (
                        <a href={pdfUrl} download>
                           <SaveBtn nameBtn={"Открыть"} />
                        </a>
                     ) : (
                        <embed src={pdfUrl} type="application/pdf" />
                     )}
                  </div>
               ) : (
                  <div className={s.analitycs_report}>{/* <h3>отчет</h3> */}</div>
               )}
            </div>
         )}
      </div>
   );
};

export default AnalyticsAccordion;
