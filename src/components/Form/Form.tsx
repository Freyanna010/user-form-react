import React, { FC, useEffect, useState } from "react";
import TextField from "../../modules/ui-kit/TextField";
import Button from "../../modules/ui-kit/Button";
import classes from "./Form.module.scss";
import Select from "../../modules/ui-kit/Select";
import { FIELD_ERROR_MESSAGE, FIELD_ERROR_MESSAGE_EMAIL } from "./constants";
import { isValidEmail } from "./validation";
import { initialError, initialValue } from "./initialForm";
import { FormError } from "./Form.type";

const Form: FC = () => {
  const [formValue, setFormValue] = useState(initialValue); 
  const [error, setError] = useState<FormError>(initialError);
  const genderOptions = [
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
  ];

  // TODO: если более очевидно прердать
  // const validateTextField = () => {
  //   const newErrors = {
  //     lastName: formValue.lastName.trim() === "",
  //     firstName: formValue.firstName.trim() === "",
  //     birthDate: birthDate === null,
  //     phone: formValue.phone.trim() === "",
  //     email: !isValidEmail(formValue.email),
  //   };
  //   //TODO: тут не работает:
  //   setError({ ...newErrors });
  // };

  const handleChange = (value: string) => {
    setFormValue((prevValue) => ({ ...prevValue, value }));
    setError(initialError);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError({
      lastName: formValue.lastName.trim() === "",
      firstName: formValue.firstName.trim() === "",
      birthDate: formValue.birthDate.trim() === "",
      // birthDate: birthDate === null //TODO: для календаряпше
      phone: formValue.phone.trim() === "",
      email: !isValidEmail(formValue.email),
    });

    //TODO: нужны какие-то условия
    // validateTextField();
    // TODO: выдает все поля false
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2>Информация о сотруднике</h2>
      <div className={classes.formGroup}></div>
      <TextField
        name="lastName"
        error={error.lastName && FIELD_ERROR_MESSAGE}
        label="Фамилия"
        onChange={handleChange}
        type="string"
      />
      <TextField
        name="firstName"
        error={error.firstName && FIELD_ERROR_MESSAGE}
        label="Имя"
        onChange={handleChange}
        type="string"
      />
      <TextField
        name="fatherName"
        label="Отчество"
        onChange={handleChange}
        type="string"
      />
      <div className={classes.shortInput}>
        <Select
          name="gender"
          value="male"
          onChange={handleChange}
          options={genderOptions}
          label="Пол"
        />
        <TextField
          name="birthDate"
          error={error.birthDate && FIELD_ERROR_MESSAGE}
          label="Дата рождения"
          onChange={handleChange}
          className="short"
          type="number"
        />
      </div>

      <div className={classes.shortInput}>
        <TextField
          name="email"
          error={error.email && FIELD_ERROR_MESSAGE_EMAIL}
          className="short"
          type="string"
        />
        <TextField
          name="address"
          label="Адрес постоянной регистрации"
          onChange={handleChange}
          className="long"
          type="string"
        />
      </div>

      <TextField name="nameEmployer" className="long" type="string" />
      <Button>Сохранить</Button>
    </form>
  );
};

export default Form;
