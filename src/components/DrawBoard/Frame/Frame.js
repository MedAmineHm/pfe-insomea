import React, { useState, useRef } from "react";
import styles from "./frame.module.css";
import BackHandRounded from "assets/img/BackHandRounded.png";
import ZoomInRounded from "assets/img/ZoomInRounded.png";
import ZoomOutRounded from "assets/img/ZoomOutRounded.png";
import UndoRounded from "assets/img/UndoRounded.png";
import RedoRounded from "assets/img/RedoRounded.png";
import SelectAllRounded from "assets/img/SelectAllRounded.png";
import ZoomOutMapRounded from "assets/img/ZoomOutMapRounded.png";
import DeleteRounded from "assets/img/DeleteRounded.png";

const Frame = () => {
  const [actions, setActions] = useState([]);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const frameRef = useRef(null);

  const addAction = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  const handleUndo = () => {
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1];
      console.log("Action annulée:", lastAction);
      const updatedActions = actions.slice(0, -1);
      setActions(updatedActions);
    }
  };

  const handleRedo = () => {
    // Implémentez la fonction pour refaire une action
    console.log("Fonction de refaire l'action à implémenter");
  };

  const handleSelectAll = () => {
    // Implémentez la fonction pour sélectionner tout
    console.log("Fonction de sélectionner tout à implémenter");
  };

  const handleZoomIn = () => {
    // Implémentez la fonction pour zoomer
    console.log("Fonction de zoom avant à implémenter");
  };

  const handleZoomOut = () => {
    // Implémentez la fonction pour dézoomer
    console.log("Fonction de zoom arrière à implémenter");
  };

  const handleZoomToFit = () => {
    // Implémentez la fonction pour ajuster le zoom
    console.log("Fonction de zoom ajusté à implémenter");
  };

  const handleDelete = () => {
    // Implémentez la fonction pour supprimer
    console.log("Fonction de suppression à implémenter");
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const offset = e.clientX - startX;
    frameRef.current.style.width = `${frameRef.current.offsetWidth + offset}px`;
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      className={styles.backhandroundedParent}
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <IconButton onClick={() => addAction("BackHandRounded")}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={BackHandRounded}
        />
      </IconButton>
      <IconButton onClick={() => addAction("ZoomInRounded")}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={ZoomInRounded}
        />
      </IconButton>
      <IconButton onClick={() => addAction("ZoomOutRounded")}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={ZoomOutRounded}
        />
      </IconButton>
      <IconButton onClick={handleUndo}>
        <img className={styles.backhandroundedIcon} alt="" src={UndoRounded} />
      </IconButton>
      <IconButton onClick={handleRedo}>
        <img className={styles.backhandroundedIcon} alt="" src={RedoRounded} />
      </IconButton>
      <IconButton onClick={handleSelectAll}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={SelectAllRounded}
        />
      </IconButton>
      <IconButton onClick={handleZoomIn}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={SelectAllRounded}
        />
      </IconButton>
      <IconButton onClick={handleZoomOut}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={SelectAllRounded}
        />
      </IconButton>

      <IconButton onClick={handleZoomToFit}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={ZoomOutMapRounded}
        />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <img
          className={styles.backhandroundedIcon}
          alt=""
          src={DeleteRounded}
        />
      </IconButton>
      <div className={styles.resizeHandle} onMouseDown={handleMouseDown}></div>
    </div>
  );
};

const IconButton = ({ onClick, children }) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default Frame;
