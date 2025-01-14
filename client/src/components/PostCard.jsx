import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../css/userpost.css';

export default function PostCard(props) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [wheek, setWheek] = React.useState(props.post.message);
  const publishDate = new Date(props.post.timestamp);
  let month = (publishDate.getMonth() + 1);
  if (month < 10) {
    month = '0' + month;}
  const year = publishDate.getFullYear();
  let date = publishDate.getDate();
  if (date < 10) {
    date = '0' + date;
  }

  const deletePost = () => {
      axios
        .delete(`/api/posts/${props.post._id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
        props.reload()      
  }

  const editPost = () => {
    const postToEdit = {
      _id: props.post._id,
      message: wheek
    }
    console.log(postToEdit)
      axios
        .put('/api/posts/', postToEdit)
        .then(res => {
          console.log(res)
        })      
        setOpenEdit(false)
        props.reload()
  }

  const openEditModal = () => {   
    setOpenEdit(true);
  }

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleWheekChange = (e) => {
    setWheek(e.target.value)
  };

  return (
    <div className="postContainer">
      <div className="avatarContainer">
        <img className="avatar" src={`../avatar/${props.post.avatar}.jpg`} alt="profile pic" />
      </div>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <p style={{ margin: '1rem' }}>{props.post.user}</p>
          <p style={{ margin: '1rem', marginRight: '3rem' }}>{year + "-" + month + "-" + date}</p>
          <IconButton edge="end" aria-label="edit" onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={deletePost}>
            <DeleteIcon />
          </IconButton>          
        </div>
        <ListItem alignItems="center">
          <ListItemText
            secondary={props.post.message}
          />
        </ListItem>
        <Divider style={{ margin: '1rem' }}/>
      </div>

      <Dialog open={openEdit} onClose={handleEditClose} aria-labelledby="form-dialog-login">
            <DialogTitle id="edit">Edit wheek</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="post"
                label="Edit wheek"
                type="text"
                onChange={handleWheekChange}
                defaultValue={wheek}
                fullWidth
                multiline
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Go back
                  </Button>
              <Button onClick={editPost} variant="contained" color="primary">
                Submit
                  </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
}