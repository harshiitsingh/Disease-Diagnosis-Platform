import React, { useState } from "react"
import { Space, Typography, message, Upload, Switch,Divider, Image,Col,Row,Card, Statistic } from "antd"
import { BulbFilled, InboxOutlined } from "@ant-design/icons"
import styles from "../styles/Home.module.css"

const { Text, Link, Paragraph } = Typography

const Pnuemonia = () => {
  const [ellipsis, setEllipsis] = useState(true)
  const [classify,setClassify] = useState(true)
  const { Dragger } = Upload
  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  return (
    <>
      <Text mark strong keyboard className={styles.title}>
        Pneumonia Detection
      </Text>
      <Divider/>
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
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
        language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined
        by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
        language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined
        by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className={styles.Dragger}>Click or drag file to this area to upload</p>
        <p className={styles.Dragger}>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>

      <Divider dashed />

      {classify &&
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
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
              color: '#cf1322',
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
      }
    </>
  )
}

export default Pnuemonia
