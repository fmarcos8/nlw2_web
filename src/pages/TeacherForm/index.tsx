import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import FormTextarea from "../../components/FormTextarea";
import FormSelect from "../../components/FormSelect";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "0", from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: "0", from: "", to: "" }]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: cost,
        schedules: scheduleItems,
      })
      .then(() => {
        alert("Cadastro Realizado Com sucesso");
        history.push("/");
      })
      .catch(() => alert("Erro no Cadastro"));
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((item, pos) => {
      if (index === pos) {
        return { ...item, [field]: value };
      }

      return item;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que Incrivel que você quer dar aulas."
        description="O primeiro passo é preecher esse formulário."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <FormInput
              label="Nome Completo"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormInput
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <FormInput
              label="Whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <FormTextarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>
            <FormSelect
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Português", label: "Português" },
              ]}
            />

            <FormInput
              label="Custo da sua hora por aula"
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            {scheduleItems.map((schedule, index) => {
              return (
                <div className="schedule-item" key={index}>
                  <FormSelect
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    label="Dia da Semana"
                    name="week_day"
                    value={schedule.week_day}
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-Feira" },
                      { value: "2", label: "Terça-Feira" },
                      { value: "3", label: "Quarta-Feira" },
                      { value: "4", label: "Quinta-Feira" },
                      { value: "5", label: "Sexta-Feira" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />

                  <FormInput
                    name="from"
                    label="Das"
                    type="time"
                    value={schedule.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />

                  <FormInput
                    name="to"
                    label="Até"
                    type="time"
                    value={schedule.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados.
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
