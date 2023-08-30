import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, DropdownButton, FloatingLabel, Form, Image, InputGroup, Row } from "react-bootstrap";
import useAxios from "axios-hooks";
import Link from "next/link";
import LayOut from "@/components/RootPage/TheLayOut";
import EditModal from "@/components/modal/EditModal";
import InputWithSelect from "@/components/InputWithSelect";
import BasicSearchInput from "@/components/Input/BasicSearch";
import { userAGForm } from "@/data/formData";
import BasicInput from "@/components/Input/Basic";
import BasicDropdownInput from "@/components/Input/BasicDropdown";
import BasicSelectInput from "@/components/Input/BasicSelect";
import BasicToggleButton from "@/components/Button/BasicToggle";
import { useRouter } from "next/router";

const UserAGEdit: React.FC = () => {
  const router = useRouter();
  const initialFormData = userAGForm.reduce((acc: any, curr: any) => {
    acc[curr.title] = curr.typeShow === "onOff" ? false : '';
    return acc;
  }, {} as Record<string, any>);

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const [formData, setFormData] = useState<any>(initialFormData);
  const [checkIsValid, setCheckIsValid] = useState<boolean>(false);
  const [alertForm, setAlertForm] = useState<string>("not");
  const [checkBody, setCheckBody] = useState<Record<string, string> | null>();

  const [searchPosition, setSearchPosition] = useState("");
  const [{ data: userAGID, loading: userAGIDLoading, error: userAGIDError }, userAGGetID,] = useAxios({

  }, { autoCancel: false });
  const [{ data: searchData, loading: searchLoediting, error: searchError }, userAGSearch] = useAxios({

  }, { autoCancel: false });
  const [{ loading: putLoediting, error: putError }, userAGPut] = useAxios({}, { manual: true });
  const [usernameExists, setUsernameExists] = useState(false);
  const [delayCompleted, setDelayCompleted] = useState(false);
  useEffect(() => {
    if (router?.query?.id) {
      userAGGetID({
        url: `/api/userAG/${router?.query?.id}`,
        method: "GET"
      });
    }
  }, [router?.query?.id, userAGGetID]);
  useEffect(() => {
    if (!userAGIDLoading) {
      const timer = setTimeout(() => {
        setDelayCompleted(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userAGIDLoading]);

  useEffect(() => {
    const populateFormData = async () => {
      if (userAGID) {
        // If there's any asynchronous operation you want to perform, do it here.
        // For now, I'll just set the formData.
        setFormData(userAGID);
      }
    };

    populateFormData();

    console.log(formData);

  }, [userAGID]);


  useEffect(() => {
    if (formData["position"]) {
      setIsFormDisabled(false);
      if (formData["position"] === "senior") {
        setSearchPosition("boss");
      } else if (formData["position"] === "master") {
        setSearchPosition("senior");
      } else if (formData["position"] === "agent") {
        setSearchPosition("master");
      }
    } else {
      setIsFormDisabled(true);
    }

  }, [formData]);

  useEffect(() => {
    if (formData["originAG"] && formData["originAG"].length >= 3) {
      userAGSearch({
        url: `/api/userAG/search?page=1&pageSize=10&position=${searchPosition}&keyword=${formData["originAG"]}`,
        method: "GET",
      });
    }
  }, [formData["originAG"]]);

  const handleInputChange = (title: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [title]: value
    }));
  }
  const isInputDisabled = (inputTitle: string) => {
    switch (inputTitle) {
      case "username":
        return true;
      case "position":
        return true;
      case "originAG":
        return true;
      default:
        return isFormDisabled;
    }
  };
  const getValidationRule = (inputTitle: string, formData: Record<string, string>) => {
    switch (inputTitle) {
      case "username":
        return (value: any) => value?.length > formData["originAG"].length && !usernameExists;
      case "originAG":
        if (formData["position"] === "senior") {
          return (value: any) => value === '';
        } else {
          return (value: any) => value?.length >= 5;
        }
      case "percent":
        return (value: any) => value?.length >= 0 || value >= 0;
      case "overdue":
        return (value: any) => value === true || value === false;
      case "commission":
        return (value: any) => value === true || value === false;
      case "adjustPercentage":
        return (value: any) => value === true || value === false;
      case "pay":
        return (value: any) => value === true || value === false;
      case "customerCommission":
        return (value: any) => value === true || value === false;
      case "actuallypaid":
        return (value: any) => value === true || value === false;
      case "recommender":
        return (value: any) => value?.length >= 0;

      default:
        return (value: any) => true;
    }
  }
  const getListArray = (inputTitle: string, arrayLoop: any[]) => {
    switch (inputTitle) {
      case "originAG":
        return arrayLoop?.map((userAG: any) => ({
          id: userAG.id,
          textShow: userAG.username
        }));

      default:
        return []; // default return value, modify as needed
    }
  }
  const getListSelect = (inputTitle: string) => {
    switch (inputTitle) {
      case "percent":
        const inputItem = userAGForm.find(item => item.title === "percent");
        const minValue = inputItem?.min || 0;
        const maxValue = inputItem?.max || 20;
        const incrementValue = 5;  // Set this to 5
        let options = [];

        for (let i = minValue; i <= maxValue; i += incrementValue) {
          options.push({
            id: i.toString(),   // convert number to string
            textShow: Math.round(i).toString(),
          });
        }
        return options;
      default:
        return [];
    }
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCheckIsValid(true);
    const validationResult = userAGForm.reduce((acc, curr: any) => {
      const value = formData[curr.title];
      const rule = getValidationRule(curr.title, formData);
      if (!rule(value)) {
        acc.isValid = false;
        acc.invalidFields[curr.title] = curr.invalidFeedback;
      }

      return acc;
    }, { isValid: true, invalidFields: {} as Record<string, string> });

    if (!validationResult.isValid) {
      setAlertForm("warning");
      setCheckBody(validationResult.invalidFields);
    } else {
      console.log("formData : ", formData);
      try {
        setAlertForm("primary");
        const response = await userAGPut({
          url: "/api/userAG/" + router?.query?.id,
          method: "PUT",
          data: formData
        });
        if (response && response.status === 200) {
          setAlertForm("success");
        } else if (response?.status === 203) {
          setAlertForm("danger");
          if (response.data.message === "Username already exists") {
            setCheckBody({ username: `ยูส ${formData.username} มีแล้ว` });
            setUsernameExists(false);
          }
        } else {
          throw new Error('Failed to send data');
        }
      } catch (error) {
        setAlertForm("danger");
      }
    }
  };
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };
  if (userAGIDLoading || !delayCompleted) {
    return (
      <LayOut>
        <div className='member-page'>
          <p>Loading...</p> {/* You can replace this with a spinner or any other loading indicator */}
        </div>
      </LayOut>
    );
  }

  // If there's an error, you can also handle it:
  if (userAGIDError) {
    return (
      <LayOut>
        <div className='member-page'>
          <p>Error loading data. Please try again later.</p>
        </div>
      </LayOut>
    );
  }
  return (
    <LayOut>
      <div className='member-page'>
        <EditModal
          checkAlertShow={alertForm}
          setCheckAlertShow={setAlertForm}
          checkBody={checkBody ?? null}
        />
        <Card>
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              UserAG - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              {userAGForm.map((inputItem, index) => (
                <Col md={4} lg={3} key={index}>
                  {inputItem.typeShow === "text" && (
                    <BasicInput
                      title={inputItem.title}
                      labelShow={inputItem.labelShow}
                      placeholderShow={inputItem.placeholderShow}
                      typeShow={inputItem.typeShow}
                      valueShow={formData[inputItem.title]}
                      valueSet={(value: any) => handleInputChange(inputItem.title, value)}
                      rules={getValidationRule(inputItem.title, formData)}
                      checkIsValid={checkIsValid}
                      invalidFeedback={inputItem.invalidFeedback}
                      disabled={isInputDisabled(inputItem.title)}

                    />
                  )}

                  {inputItem.typeShow === "dropdown" && (
                    <BasicDropdownInput
                      title={inputItem.title}
                      labelShow={inputItem.labelShow}
                      placeholderShow={inputItem.placeholderShow}
                      valueShow={formData[inputItem.title]}
                      valueSet={(value: string) => handleInputChange(inputItem.title, value)}
                      rules={getValidationRule(inputItem.title, formData)}
                      checkIsValid={checkIsValid}
                      invalidFeedback={inputItem.invalidFeedback}
                      list={inputItem.list || []}
                      disabled={isInputDisabled(inputItem.title)}

                    />
                  )}

                  {inputItem.typeShow === "search" && (
                    <BasicSearchInput
                      title={inputItem.title}
                      labelShow={inputItem.labelShow}
                      placeholderShow={inputItem.placeholderShow}
                      typeShow={inputItem.typeShow}
                      valueShow={formData[inputItem.title]}
                      valueSet={(value: any) => handleInputChange(inputItem.title, value)}
                      rules={getValidationRule(inputItem.title, formData)}
                      checkIsValid={checkIsValid}
                      invalidFeedback={inputItem.invalidFeedback}
                      listArray={getListArray(inputItem.title, searchData?.data)}
                      disabled={isInputDisabled(inputItem.title)}

                    />
                  )}
                  {inputItem.typeShow === "select" && (
                    <BasicSelectInput
                      title={inputItem.title}
                      labelShow={inputItem.labelShow}
                      placeholderShow={inputItem.placeholderShow}
                      typeShow={inputItem.typeShow}
                      valueShow={formData[inputItem.title]}
                      valueSet={(value: any) => handleInputChange(inputItem.title, value)}
                      rules={getValidationRule(inputItem.title, formData)}
                      checkIsValid={checkIsValid}
                      invalidFeedback={inputItem.invalidFeedback}
                      listArray={getListSelect(inputItem.title)}
                      disabled={isInputDisabled(inputItem.title)}
                    />
                  )}
                  {inputItem.typeShow === "onOff" && (
                    <BasicToggleButton
                      title={inputItem.title}
                      labelShow={inputItem.labelShow}
                      placeholderShow={inputItem.placeholderShow}
                      typeShow={inputItem.typeShow}
                      valueShow={formData[inputItem.title]}
                      valueSet={() => handleInputChange(inputItem.title, !formData[inputItem.title])}  // Convert boolean back to string if necessary.
                      rules={getValidationRule(inputItem.title, formData)}
                      checkIsValid={checkIsValid}
                      invalidFeedback={inputItem.invalidFeedback}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="danger mx-2" onClick={handleGoBack}>
              ย้อนกลับ
            </Button>
            <Button variant="secondary mx-2" onClick={handleReload}>
              ล้าง
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              ยืนยัน
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default UserAGEdit;   