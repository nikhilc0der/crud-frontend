import React from "react";
import Cross from "./icon/Cross";
function FormComp({
  onSubmitForm,
  onUpdateField,
  onBlurField,
  errors,
  handleClose,
  rest,
}) {
  return (
    <>
      <div className="modal">
        <div className="bg-white p-4">
          <div
            className="flex justify-end items-center cursor-pointer text-[30px]"
            onClick={handleClose}
          >
            <Cross />
          </div>
          <form action="" method="POST" onSubmit={onSubmitForm}>
            <h1>REGISTER</h1>
            <input
              placeholder="Enter Your Name"
              type="text"
              name="username"
              id="username"
              value={rest.username}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.username.dirty && errors.username.error ? (
              <p className="my-[2px] text-red-500">{errors.username.message}</p>
            ) : null}
            <input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
              value={rest.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
              <p className="my-[2px] text-red-500">{errors.email.message}</p>
            ) : null}
            <input
              placeholder="Enter Your Phone Number"
              type="number"
              name="phone"
              id="phone"
              value={rest.phone}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.phone.dirty && errors.phone.error ? (
              <p className="my-[2px] text-red-500">{errors.phone.message}</p>
            ) : null}
            <button
              className="bg-blue-500 w-[100px] text-white p-2 cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormComp;
