import React, { useState } from "react";
import { Form, Layout, Checkbox, Button, Typography, Input, Modal } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import FaceMask from "../Icons/FaceMask";
import Gloves from "../Icons/Gloves";
import HandSanitizer from "../Icons/HandSanitizer";
import Suit from "../Icons/Suit";

const { Content } = Layout;
const { Title } = Typography;

const BlockContent = styled(Content)`
  display: flex;
  position: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 5px;
  padding: 40px;
  padding-bottom: 200px;
  margin: auto;
`;

const BlockCol = styled(Col)`
  position: center;
  justify-content: center;
  background: #f5f5f5;
  width: 95%;
  border-radius: 5px;
  padding: 20px;
  align-items: center;
`;

const InnerCol = styled(Col)`
  margin-left: 180px;
  margin-right: 180px;
`;

const IconButton = styled(Button)`
  display: flex;
  margin: 15px;
  border-radius: 15px;
  padding-bottom: 32px;
  &&.ant-btn:hover,
  .ant-btn:focus {
    border-color: #00000000;
  }
  && {
    border-color: #00000000;

  }
  &&.selected {
    border-color: lightblue !important;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 5px;
  width: 34;
  margin: 10px;
  padding: 5px;
`;


const FormItem = styled(Form.Item)`
  display: flex;
  padding: 20px;
  justify-content: center;
  width: 100%;
  && .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }
`;

const AddressItem = styled(Form.Item)`
  display: flex;
  padding: 20px;
  justify-content: center;
  && .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }
`;


const FormButton = styled(Button)`
  margin-top: 15px;
  border-radius: 5px;
  margin-left:200px;
  margin-right:200px;
  padding: 5px;
  width: 40%;
`;
const FlexForm = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 5px;
  padding: 20px;
  margin: auto;
`;

function CollectionInfoContent(props) {
  const { setCurrentStep } = props;
  console.log("set current", props);
  const [options, setOptions] = useState({});

  const [visible, setVisible] = useState(false);
  const [ address, setAddress] = useState('');
  const [ product , setProduct] = useState('');  

    // pop
    const triggerModal = (name) => {
      setVisible(true);
      setProduct(name);
    }

  function toggleOptions(value) {
    let copyOptions = { ...options };
    console.log("copty", copyOptions)
    triggerModal(value);
    switch (value) {
      case "faceMask":
        copyOptions.faceMask = copyOptions.faceMask === true ? false : true;
        setOptions(copyOptions);
        break;
      case "gloves":
        copyOptions.gloves = copyOptions.gloves === true ? false : true;
        setOptions(copyOptions);
        break;
      case "handSanitizer":
        copyOptions.handSanitizer =
          copyOptions.handSanitizer === true ? false : true;
        setOptions(copyOptions);
        break;
      case "suit":
        copyOptions.suit = copyOptions.suit === true ? false : true;
        setOptions(copyOptions);
        break;
      default:
    }
    console.log(options);
  }

  function submitData(e) {

    console.log(address)
    setCurrentStep('success');
    // e.preventDefault();
    
  }

  const [items, setItems] = useState([]);

  function ModalCustom (props) {


    // const [ name, setName] = useState(null);
    // const [ amount, setAmount] = useState(null);
    // const [ description, setDescription] = useState(null);
  
    
      // onClose 
      const handleOk = () => {
        setVisible(false);
      };
    
      const handleCancel = () => {
        setVisible(false);
      };
    
      const addProductToList = (name, amount, description) => {
        var product = {
          name,
          description,
          amount,
        };
        var tempList = items;
        tempList.push(product);
        setItems(tempList);
        // console.log("prodcut", product);
        // console.log('list origin', items);
      
        setVisible(false);


      }
      const onFinish = values => {

        console.log("onfinsh values of the product", values);
        // setAmount(values.amount);
        // setName(props.name);
        // setDescription(values.description);


        // console.log("onfinsh values of the product", values.amount);

        // console.log("onfinsh values of the product", props.name);

        // console.log("onfinsh values of the product", values.description);
        addProductToList(props.name, values.amount, values.description);
      }
    return (
      <Modal
          closable={true}
          footer={null}
          visible={props.visible}
          title={props.name}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>
          ]}
      >
      <FlexForm onFinish={onFinish}>
        <Form.Item>
          <Title level={3}>More Information</Title>
        </Form.Item>
        
        <Form.Item
            name="description"
            rules={[{ required: true, message: " " }]}
                
        >
    
          <StyledInput placeholder="Description" />
        </Form.Item>
        <Form.Item
            name="amount"
            rules={[{ required: true, message: " " }]}
        >
          <StyledInput placeholder="quantity" />
        </Form.Item>
        <FormItem>
              <FormButton type="primary" htmlType="submit">
              Add
              </FormButton>
        </FormItem>
        </FlexForm>
      </Modal>
      )
  };

  return (
    <BlockContent>
      <BlockCol>
        <Row center="xs">
          <Title level={5}>Submission</Title>
        </Row>
        <Row style={{ marginBottom: "15px" }} center="xs">
          <IconButton
            className={options.faceMask ? "selected" : ""}
            onClick={() => toggleOptions("faceMask")}
          >
            <FaceMask />
            <label style={{ marginTop: "3px" }}>Face Mask</label>
          </IconButton>
          <IconButton
            className={options.gloves ? "selected" : ""}
            onClick={() => toggleOptions("gloves")}
          >
            <Gloves />
            <label style={{ marginTop: "3px" }}>Goggles & Gloves</label>
          </IconButton>
          <IconButton
            className={options.handSanitizer ? "selected" : ""}
            onClick={() => toggleOptions("handSanitizer")}
          >
            <HandSanitizer />
            <label style={{ marginTop: "3px" }}>Sanitization Products</label>
          </IconButton>
          <IconButton
            className={options.suit ? "selected" : ""}
            onClick={() => toggleOptions("suit")}
          >
            <Suit />
            <label style={{ marginTop: "3px" }}>Full body suits</label>
          </IconButton>
        </Row>
        <InnerCol>
        <Row left="xs" width="60px" style={{ paddingLeft: "15px" }}>
          <Title level={3}>Address</Title>
        </Row>
        <Row>
         
          <StyledInput placeholder="Address Here" size="large"  onChange={e => setAddress(e.target.value)}/>
      
        
        </Row>
        </InnerCol>
        <Row center="xs">
          <FormButton type="primary" onClick={() => submitData()}>
            Donate
          </FormButton>
        </Row>
      </BlockCol>

      <div>
      <ModalCustom visible={visible} name={product}/>
      </div>
    </BlockContent>
  );
}

export default CollectionInfoContent;
