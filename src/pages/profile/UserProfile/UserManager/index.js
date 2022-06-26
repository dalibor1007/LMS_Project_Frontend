import React, {useState, useEffect} from 'react';
import {Form, Input, Popconfirm, Table, Typography, Button} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
const server_url = 'http://localhost:3001';
// const Option = Select.Option;
const EditableCell = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const inputNode =  <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [editingKey, setEditingKey] = useState('');
  const [kindvalue, setKindvalue] = useState('student');
  const [rolevalue, setRolevalue] = useState('user');
  
  useEffect(() => {
    const getCourses = async () => {
      try{
        const {data} = await axios.get(`${server_url}/api/users`);
        for (let i in data) {
          data[i].key = i.toString();
          setCount(i);
        }
        console.log('courseDAta=--00000000000--', data);
        setData(data);
      } catch(error) {
        console.log('error::', error);
      }
    }
    getCourses();
  }, []);
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      email: '',
      role: '',
      kind: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleDelete = async (record) => {
    
    const response = await axios.delete(`${server_url}/api/users/${record._id}`);
    console.log('delete_response====>', response);
    setData(data.filter((item) => item.key !== record.key));
  };

  
  const handleAdd = () => {
    const newData = {
      key: count+1,
      name: ``,
      age: '',
      address: ``,
    };
    setCount(count+1);
    setData([...data, newData]);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const handleChange = (e) => {
    setKindvalue(e.target.value);
  }

  const save = async (_id) => {
    try {
      const row = await form.validateFields();
      console.log('row======', row); 
      const response = await axios.put(`${server_url}/api/users/${_id}`, {
        _id: _id,
        name: row.name,
        email: row.email,
        role: rolevalue,
        kind: kindvalue
      });
      console.log('response========>', response);
      const newData = response.data;
      for (let i in newData) {
        newData[i].key = i.toString();
        setCount(i);
      }
      const index = newData.findIndex((item) => _id === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'userName',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Emaiil',
      dataIndex: 'email',
      width: '10%',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <select name='role' value={rolevalue} onChange={(e) => setRolevalue(e.target.value)}>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </span>
        ) : (
          <span>{record.role}
          </span>
        );
      },
    },
    {
      title: 'kind',
      dataIndex: 'kind',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <select  name='kind' value={kindvalue} onChange={(e) => handleChange(e)}>
              <option value='teacher'>Teacher</option>
              <option value='student'>Student</option>
            </select>
          </span>
        ) : (
          <span>{record.kind}
          </span>
        );
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '25%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}>
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            {/* <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}>
              Edit
            </Typography.Link> |  */}
            <Button
              onClick={() => edit(record)}
              disabled={editingKey !== ''}
              type='primary'
              style={{
                marginBottom: 6,
              }}>
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(record)}
              disabled={editingKey !== ''}
              type='danger'
              style={{
                marginBottom: 6,
                marginLeft: 10
              }}>
              Delete
            </Button>
            {/* <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => handleDelete(record)}>
              delete
            </Typography.Link> */}
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputtype : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        onClick={() => handleAdd()}
        type='success'
        style={{
          marginBottom: 6,
        }}>
        Add a User
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const UserManager = () => {
  return (
    <div>
      
      <EditableTable />;
    </div>
  )
};

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default UserManager;
