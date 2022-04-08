import { useEffect, useState } from "react";
import { useFrontendBoot } from ".";

export function usePos(isPos, currentForm) {
  const defaultValue = {
    banner: "",
    question: "",
  };

  function returnDefaultString(value) {
    if (value === "<p><br></p>") {
      return "";
    } else {
      return value;
    }
  }
  const {
    data: { settings },
  } = useFrontendBoot();
  const [posContent, setPosContent] = useState(defaultValue);

  useEffect(() => {
    let place = currentForm;
    if (currentForm.startsWith("location")) {
      place = "location";
    }
    if (settings) {
      switch (place) {
        case "basic-details":
          isPos
            ? setPosContent({
                banner: returnDefaultString(settings?.basic_detail_banner_pos),
                question: returnDefaultString(
                  settings?.basic_detail_question_pos,
                ),
              })
            : setPosContent({
                banner: returnDefaultString(settings?.basic_detail_banner),
                question: returnDefaultString(settings?.basic_detail_question),
              });
          break;
        case "members":
          isPos
            ? setPosContent({
                banner: returnDefaultString(settings?.input_members_banner_pos),
                question: returnDefaultString(
                  settings?.input_members_question_pos,
                ),
              })
            : setPosContent({
                banner: returnDefaultString(settings?.input_members_banner),
                question: returnDefaultString(settings?.input_members_question),
              });
          break;
        case "plantype":
          isPos
            ? setPosContent({
                banner: returnDefaultString(settings?.plan_type_banner_pos),
                question: returnDefaultString(settings?.plan_type_question_pos),
              })
            : setPosContent({
                banner: returnDefaultString(settings?.plan_type_banner),
                question: returnDefaultString(settings?.plan_type_question),
              });
          break;
        case "location":
          isPos
            ? setPosContent({
                banner: returnDefaultString(settings?.location_banner_pos),
                question: returnDefaultString(settings?.location_question_pos),
              })
            : setPosContent({
                banner: returnDefaultString(settings?.location_banner),
                question: returnDefaultString(settings?.location_question),
              });
          break;
        case "medicalHistory":
          isPos
            ? setPosContent({
                banner: returnDefaultString(
                  settings?.medical_history_banner_pos,
                ),
                question: returnDefaultString(
                  settings?.medical_history_question_pos,
                ),
              })
            : setPosContent({
                banner: returnDefaultString(settings?.medical_history_banner),
                question: returnDefaultString(
                  settings?.medical_history_question,
                ),
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
  }, [settings, currentForm, isPos]);

  return { posContent };
}
