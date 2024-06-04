import { Row, Col, Button, Card, Space, Modal } from "antd";
import React, { useState,  } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Plants = () => {
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
  console.log(data.map((item) => item.img));
  return (
    <>
      <Row gutter={24} style={{ display: "flex", justifyContent: "end" }}>
        <Col span={3}>
          <Button
            type="primary"
            style={{ width: "100%", padding: "0" }}
            danger
            onClick={() => setModal2Open(true)}
          >
            Create Plants
          </Button>{" "}
        </Col>
      </Row>
      <Row>
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
              background:'rgb(0 0 0 / 4%)',   
              display: "flex",
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
      </Row>

      <Row
        gutter={24}
        style={{
          margin: "1rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {data.map((index, item) => (
            <Link to="/Organization Dashboard">
            
          <Card
            key={index}
            size="small"
            style={{
              width: "250px",
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
                background:'rgb(0 0 0 / 4%)',
                                display: "flex",
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
            </div>
            <h3>Plants 1</h3>
          </Card>
            </Link>
        ))}
      </Row>
      <Modal
        width={"400px"}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            Create Plant
          </div>
        }
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem 1rem",
            alignItems: "center",
          }}
        >
          {ImageFile ? (
            <img
              src={ImageFile}
              style={{
                width: "100px",
                height: "100px",
                background: "grey",
                borderRadius: "50%",
                objectFit: "contain",
              }}
              alt=""
            />
          ) : null}
          <label>
            Upload image
            <input
              name="myImage"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
          <input
            type="text"
            style={{
              height: "1.5rem",
              width: "100%",
              padding: "0.5rem",
              border: "0.5px solid grey",
              borderRadius: "5px",
              outline: "none",
            }}
            placeholder="Enter Plant Name"
          />
        </div>
        <div
          className=""
          style={{ display: "flex", justifyContent: "end", gap: "1rem" }}
        >
          <Button
            type="primary"
            danger
            onClick={() => setModal2Open(false)}
            style={{ background: "transparent", color: "#000" }}
          >
            Cancel
          </Button>{" "}
          <Button type="primary" danger onClick={() => setModal2Open(true)}>
            Save
          </Button>{" "}
        </div>
      </Modal>
    </>
  );
};

export default Plants;
