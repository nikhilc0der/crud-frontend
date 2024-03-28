import React, { useEffect, useState } from "react";
import { useLoginFormValidator } from "./useLoginFormValidator";
import axios from "axios";
import TableArea from "./TableArea";
import FormComp from "./FormComp";

axios.defaults.baseURL = "http://localhost:8080/";

function MainComp() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [formEdit, setFormEdit] = useState({
    _id: "",
    username: "",
    email: "",
    phone: "",
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };
  /// ============ Create Data ===============
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", form);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setForm({
        username: "",
        email: "",
        phone: "",
      });
    }
  };
  //  =======  Read Data ============
  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  // ========== Delete Data ================
  const onDeleteItem = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };
  // ========== Update Data ================
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...formEdit,
      [field]: e.target.value,
    };
    setFormEdit(nextFormState);
  };

  const handleEdit = (item) => {
    setFormEdit(item);
    setEditSection(true);
  };

  return (
    <>
      <div className="mainContainer">
        {addSection && (
          <FormComp
            onSubmitForm={onSubmitForm}
            onUpdateField={onUpdateField}
            rest={form}
            onBlurField={onBlurField}
            errors={errors}
            handleClose={() => setAddSection(false)}
          />
        )}

        {editSection && (
          <FormComp
            onSubmitForm={handleUpdate}
            onUpdateField={handleEditOnChange}
            rest={formEdit}
            onBlurField={onBlurField}
            errors={errors}
            handleClose={() => setEditSection(false)}
          />
        )}

        <TableArea
          setAddSection={setAddSection}
          dataList={dataList}
          onDeleteItem={onDeleteItem}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
}

export default MainComp;
