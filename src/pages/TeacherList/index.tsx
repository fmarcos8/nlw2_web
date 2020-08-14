import React, { useState, FormEvent } from "react";

import "./styles.css";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

import api from "../../services/api";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();

    api
      .get("/classes", {
        params: {
          subject,
          week_day,
          time,
        }
      })
      .then(({ data }) => {
        setTeachers(data);
      });
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <FormSelect
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            label="Matéria"
            name="subject"
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Português", label: "Português" },
            ]}
          />

          <FormSelect
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            label="Dia da Semana"
            name="week_day"
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terça" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sábado" },
            ]}
          />

          <FormInput
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            type="time"
            name="time"
            label="Hora"
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
