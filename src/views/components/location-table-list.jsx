import { connect } from "react-redux";
import { useState } from "react";
import { updateList } from "../../redux/reducer";
import { Table, Button, Popconfirm } from "antd";
import styles from "../scss/location-table-list.module.scss";

function LocationTableList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const data = props.list;

  const columns = [
    {
      title: "Location",
      dataIndex: "address",
    },
    {
      title: "Latitude",
      dataIndex: "lat",
    },
    {
      title: "Longitude",
      dataIndex: "lng",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = () => {
    const tmpList = props.list.filter(
      (item) => selectedRowKeys.indexOf(item.key) === -1 //delete those selected items
    );
    console.log("onDeleteClick new list: ", tmpList);
    props.updateList(tmpList);
    setSelectedRowKeys([]);
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOK = () => {
    setVisible(false);

    handleDelete(); //delete selected after confirming
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className={styles["location-table-container"]}>
      <div className="location-table">
        <Popconfirm
          title="Are you sure to delete?"
          visible={visible}
          onConfirm={handleOK}
          onCancel={handleCancel}
        >
          <Button
            type="primary"
            onClick={showPopconfirm}
            disabled={!hasSelected}
            style={{
              marginBottom: 10,
            }}
          >
            Delete
          </Button>
        </Popconfirm>
        ,
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    const { list } = state;
    return { list };
  },
  { updateList }
)(LocationTableList);
