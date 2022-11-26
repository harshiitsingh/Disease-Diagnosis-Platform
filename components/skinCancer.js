import React, { useState } from "react"
import { Space, Typography, message, Upload, Switch, Divider, Image, Col, Row, Card, Statistic } from "antd"
import { BulbFilled, InboxOutlined } from "@ant-design/icons"
import styles from "../styles/Home.module.css"
import axios from "axios"
import FormData from 'form-data';

const { Text, Link, Paragraph } = Typography

const SkinCancer = () => {
  const [ellipsis, setEllipsis] = useState(true)
  const [classify, setClassify] = useState(false)
  const [file, setFile] = useState(null)
  const [label, setLabel] = useState(null)
  const [prob, setProb] = useState(null)
  const { Dragger } = Upload
  const props = {
    // name: "image",
    // multiple: false,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // onChange(info) {
    //   const { status } = info.file
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList)
    //   }
    //   if (status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully.`)
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`)
    //   }
    // },
    // async onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files)
    // },
  }

  let formData = new FormData()
  async function handleDrop(e) {
    setFile(e.file)
    console.log(file)
    formData.append("image", file)
    await axios({
      method: "post",
      url: "http://localhost:5000/classify",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    })
      .then((props) => {
        setClassify(true)
        console.log(props)
        setLabel(props.data.label)
        setProb(props.data.prob)
      })
      .catch(function (error) {
        message.error(`${e.file.name} file upload failed.`)
      })
  }

  return (
    <>
      <Text mark strong keyboard className={styles.title}>
        Skin Cancer Detection
      </Text>
      <Divider />
      <Paragraph
        ellipsis={
          ellipsis
            ? {
                rows: 5,
                expandable: true,
                symbol: "read more",
              }
            : false
        }
      >
        Melanoma is considered the most deadly form of skin cancer and is caused by the development of a malignant
        tumour of the melanocytes. The objective of the skin cancer detection project is to develop a framework to
        analyze and assess the risk of melanoma using dermatological photographs taken with a standard consumer-grade
        camera.
        <br />
        There are several ways to detect skin cancer from symptoms or check ups. One can also perform skin self exam to
        detect the same. Here we provide a service to self diagnose for skin cancer. We have used Deep learning
        libraries for feature extraction and different techniques to validate the model and classify the results using
        hyper deep learning technique.
      </Paragraph>

      <Dragger {...props} onChange={(e) => handleDrop(e)} onDrop={(e) => handleDrop(e)}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className={styles.Dragger}>Click or drag file to this area to upload</p>
        <p className={styles.Dragger}>
          Diagnose your skin whether you have skin cancer of type <strong>Malignant</strong> or
          <strong>Benign</strong>!
        </p>
      </Dragger>

      <Divider dashed />

      {classify && (
        <>
          <Row>
            <Col flex={2}>
              <Image
                width={200}
                src="https://cdn.vox-cdn.com/thumbor/JAfYLgi9wm5G0ilJqRrsMIXPtvc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23235426/daredevil.jpg"
              />
            </Col>
            <Col flex={3}>
              <div className="site-statistic-demo-card">
                <Row gutter={16}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Label"
                        value={label}
                        precision={2}
                        valueStyle={{
                          color: "#3f8600",
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Probablity"
                        value={prob}
                        precision={2}
                        valueStyle={{
                          color: "#cf1322",
                        }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default SkinCancer
