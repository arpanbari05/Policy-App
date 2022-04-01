import { useEffect, useState } from "react";
import { useFrontendBoot } from ".";

export function usePos(isPos, currentForm) {
  const defaultValue = {
    banner: "",
    question: "",
  };
  const {
    data: { settings },
  } = useFrontendBoot();
  const [posContent, setPosContent] = useState(defaultValue);

  useEffect(() => {
    if (settings) {
      switch (currentForm) {
        case "basic-details":
          isPos
            ? setPosContent({
                banner: settings.basic_detail_banner_pos,
                question: settings.basic_detail_question_pos,
              })
            : setPosContent({
                banner: settings.basic_detail_banner,
                question: settings.basic_detail_question,
              });
          break;
        case "members":
          isPos
            ? setPosContent({
                banner: settings.input_members_banner_pos,
                question: settings.input_members_question_pos,
              })
            : setPosContent({
                banner: settings.input_members_banner,
                question: settings.input_members_question,
              });
          break;
        case "plantype":
          isPos
            ? setPosContent({
                banner: settings.plan_type_banner_pos,
                question: settings.plan_type_question_pos,
              })
            : setPosContent({
                banner: settings.plan_type_banner,
                question: settings.plan_type_question,
              });
          break;
        case "location":
          isPos
            ? setPosContent({
                banner: settings.location_banner_pos,
                question: settings.location_question_pos,
              })
            : setPosContent({
                banner: settings.location_banner,
                question: settings.location_question,
              });
          break;
        case "medicalHistory":
          isPos
            ? setPosContent({
                banner: settings.medical_history_banner_pos,
                question: settings.medical_history_question_pos,
              })
            : setPosContent({
                banner: settings.medical_history_banner,
                question: settings.medical_history_question,
              });
          break;
        default:
          setPosContent({
            banner: "",
            question: "",
          });
          break;
      }
    }
  }, [settings, currentForm]);

  return { posContent };
}
