import { Row, Col, Button, Card, Space, Modal } from "antd";
import React, { useState, Link } from "react";
import Person from ".././assets/images/person.png";
import Download from ".././assets/images/material.png";
import { DownloadOutlined } from "@ant-design/icons";

const Select_dashboard = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [ImageFile, setImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    console.log(image);
    setImageFile(image);
  };

  const data = Array(12).fill({
    title: "Machine 1",
    img: "https://aivolved.in/wp-content/uploads/2022/11/ai-logo.png",
  });
  return (
    <>
      <Row style={{ display: "flex", gap: "1rem" }}>
        <Card
          size="small"
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            height: "200px",
            alignItems: "center",
            boxShadow: "none",
            border: "1px solid #0000004a",
          }}
        >
          <div
            className=""
            style={{
              width: "100px",
              height: "100px",
              background:'rgb(0 0 0 / 4%)',              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <img
              src="https://aivolved.in/wp-content/uploads/2022/11/ai-logo.png"
              style={{ width: "60%" }}
              alt=""
            />
          </div>{" "}
          <h3>Organization Name</h3>
        </Card>
        <Card
          size="small"
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            height: "200px",
            alignItems: "center",
            boxShadow: "none",
            border: "1px solid #0000004a",
          }}
        >
          <div
            className=""
            style={{
              width: "100px",
              height: "100px",
              background:'rgb(0 0 0 / 4%)',              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <img
              src="https://aivolved.in/wp-content/uploads/2022/11/ai-logo.png"
              style={{ width: "60%" }}
              alt=""
            />
          </div>{" "}
          <h3>Plant Name</h3>
        </Card>
      </Row>

      <Row
        gutter={24}
        style={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          border: "1px solid grey",
          height: "400px",
          borderRadius: "10px",
        }}
      >
        <h2>What is this dashboard for?</h2>
        <div className="" style={{ display: "flex", gap: "1rem" }}>
          <div
            className="organization_tab"
            size="small"
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              boxShadow: "none",
              border: "1px solid #0000004a",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <img src={Person} alt="error" />
            <span style={{ fontWeight: "550" }}>Human Detection</span>
          </div>
          <div
            className="organization_tab"
            size="small"
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              boxShadow: "none",
              border: "1px solid #0000004a",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <img src={Download} alt="error" />
            <span style={{ fontWeight: "550" }}>Object Detection</span>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Select_dashboard;
