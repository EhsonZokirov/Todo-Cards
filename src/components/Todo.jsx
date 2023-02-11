import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const styleModalDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};
const label = { inputProps: { "aria-label": "Switch demo" } };

function Todo() {
  const url = `https://63d0e533120b32bbe8eca000.mockapi.io/Todo`;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [card, setCard] = useState([]);
  // EDIT useState
  const [titleEdit, setTitleEdit] = useState("");
  const [messageEdit, setMessageEdit] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = (id, title, message) => {
    setTitleEdit(title);
    setMessageEdit(message);
    setId(id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  // ADD useState
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  //DELETE useState
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // PUT async function
  const putCard = async () => {
    try {
      const { data } = await axios.put(`${url}/${id}`, {
        title: titleEdit,
        message: messageEdit,
      });
      handleCloseEdit();
    } catch (error) {}
  };
  //  GET async function
  const getCard = async () => {
    try {
      const { data } = await axios.get(url);
      setCard(data);
      console.log(data);
    } catch (error) {}
  };
  // POST async function
  const postCard = async () => {
    try {
      const { data } = axios.post(url, { title: title, message: message });
      handleCloseAdd();
    } catch (error) {}
  };
  // DELETE async function
  const deleteCard = async () => {
    try {
      const { data } = await axios.delete(`${url}/${id}`);
      handleClose();
    } catch (error) {}
  };
  const completedCard = async (e) => {
    try {
      const { data } = await axios.put(`${url}/${e.id}`, {
        ...e,
        complete: !e.complete,
      });
    } catch (error) {}
  };
  useEffect(() => {
    getCard();
  }, [card]);

  return (
    <div>
      {/* MODAL ADD */}
      <div className="text-center">
        <div>
          <h1>Add Card</h1>
          <IconButton color="primary">
            <AddCircleIcon onClick={handleOpenAdd} />
          </IconButton>
        </div>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                variant="standard"
                label="Title"
              ></TextField>
              <TextField
                id="standard-multiline-static"
                label="Message"
                multiline
                variant="standard"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "green", paddingX: "50px" }}
              onClick={postCard}
            >
              Добавить
            </Button>
          </Box>
        </Modal>
      </div>
      {/* MODAL ADD */}
      {/* MODAL EDIT */}
      <div className="text-center">
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                onChange={(e) => setTitleEdit(e.target.value)}
                value={titleEdit}
                variant="standard"
                label="Title"
              ></TextField>
              <TextField
                id="standard-multiline-static"
                label="Message"
                multiline
                variant="standard"
                onChange={(e) => setMessageEdit(e.target.value)}
                value={messageEdit}
              />
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "green", paddingX: "50px" }}
              onClick={(e) => putCard(e.id)}
            >
              Сохранить
            </Button>
          </Box>
        </Modal>
      </div>
      {/* MODAL EDIT */}
      {/* MODAL DELETE */}
      <div className="text-center">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModalDelete}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Вы точно хотите удалить карточку ?
            </Typography>
            <div className="flex justify-evenly pt-10">
              <Button
                variant="contained"
                sx={{ bgcolor: "green", paddingX: "50px" }}
                onClick={() => deleteCard(id)}
              >
                Да
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "green", paddingX: "50px" }}
                onClick={handleClose}
              >
                Нет
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* MAP */}
      <div className=" grid md:grid-cols-3 ">
        {card.map((e) => {
          return (
            <div key={e.id} className="">
              <div className="bg-slate-300 m-auto my-5 md:w-[50%] p-10 rounded-lg shadow-lg  text-center">
                <h1 className="font-bold md:text-[30px]">
                  {e.complete ? (<p className="line-through"> {e.title} </p>) : (<>{e.title}</>)}
                </h1>
                <Typography
                  id="standard-multiline-static"
                  label="Message"
                  multiline
                  variant="standard"
                  sx={{ display: "flex-wrap" }}
                >
                  {e.message}
                </Typography>
                <div className="flex justify-center m-auto">
                  <button className="m-auto">
                    <EditIcon
                      onClick={() => handleOpenEdit(e.id, e.title, e.message)}
                      sx={{ color: "orange" }}
                    />
                  </button>
                  <button onClick={() => handleOpen(e.id)} className="m-auto">
                    <DeleteIcon sx={{ color: "red" }} />
                  </button>

                  {e.complete ? (
                    <Switch onClick={() => completedCard(e)} defaultChecked />
                  ) : (
                    <Switch onClick={() => completedCard(e)} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Todo;
