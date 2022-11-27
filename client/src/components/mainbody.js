import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../index.css';

function AskQuestionButton(props) {
  if (props.user.username.localeCompare("guest account") != 0) {
    return (<div className="col-md-4" id="askquestion" onClick={() => props.statehandler('qaskpage', props.user)}> <button> Ask A Question </button> </div>);
  }
  return (<div className="col-md-4"></div>);
}

function AnswerButton(props) {
  if (props.user.username.localeCompare("guest account") != 0) {
    return (<div className="row"> <button type="submit" id="answerquestionpage" onClick={() => props.statehandler('answerquestionspage' + props.qid, props.user)}> Answer Question </button> </div>);
  }
  return (<div className="row"></div>);
}

//Flag is for adding the edit and delete functionality.
/*
function displayQuestions(props, axiosquestions, axiosqt, axiosqa, qindex, f = 0) {
  let questionRows = []
  for (let q = qindex; q < axiosquestions.length; q++) {
    if (q < qindex + 5) {
      let qid = axiosquestions[q].qid;
      let dynamicid = 'link' + qid;
      let qkeyid = 'qkey' + qid;
      let tagHtml = [];
      //Find axios tags in axiosqt
      let axiostags = []
      for (let f = 0; f < axiosqt.length; f++) {
        if (axiosqt[f].qid == qid) {
          let tag = {
            name: axiosqt[f].name,
            tid: axiosqt[f].tid
          }
          axiostags.push(tag);
        }
      }
      for (let t = 0; t < axiostags.length; t++) {
        if (t % 4 == 0 && t > 1) {
          tagHtml.push(<br />);
        }
        let tkeyid = 'tkey' + qid + '_' + axiostags[t].tid;
        tagHtml.push(<button className="tag" key={tkeyid}> {axiostags[t].name} </button>);
      }
      //Find number of axios answers in axiosqa
      let num_answers = 0
      for (let a = 0; a < axiosqa.length; a++) {
        if (axiosqa[a].qid == qid) {
          num_answers += 1;
        }
      }
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(axiosquestions[q].ask_date_time.substring(6, 8)) - 1;
      let day_num = axiosquestions[q].ask_date_time.substring(8, 10)
      let year_num = axiosquestions[q].ask_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = axiosquestions[q].ask_date_time.substring(11, 16);
      let addFunctionality = []
      //If the flag is activated (profile page)
      if (f == 1) {
        //Functionality for deletion.
        const handleDeleteClick = event => {
          event.preventDefault();
          if(window.confirm("Delete this question? [" + axiosquestions[q].title + "]") == true) {
            axios.post('http://localhost:8000/deletequestion', {qid: axiosquestions[q].qid}).then(res => { });
            alert("Deleted question! Change views to see the actual change on the website.")
          }
        }
        addFunctionality.push(<div><button className="btn btn-edit"> Edit </button>
          <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button></div>);
      }

      questionRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={qkeyid}>
              <div class="card-body" onClick={() => props.statehandler('answerspage' + dynamicid, props.user)}>
                <h5 className="card-title">
                  Question Title: {axiosquestions[q].title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ? Upvotes {axiosquestions[q].views} Views {num_answers} Answers
                </h6>
                <div className="mb-3">
                  Tags: {tagHtml}
                </div>
                <div className="mb-3">
                  Asked By <span className="asked"> {axiosquestions[q].asked_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              {addFunctionality}
            </div>
          </div>
        </div >
      )
      questionRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if (axiosquestions == 0) {
    questionRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body">
              <h5 className="card-title">
                Hello! If you are seeing this card this means either...
              </h5>
              <div className="mb-3">
                Case 1. There are no questions in the database.
                <br />
                Case 2. The questions cannot be retrieved for the database unless you refresh the application.
              </div>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  return questionRows;
}
*/
/*
function displayAnswers(props, answers, qindex) {

  let answerRows = []
  for (let q = qindex; q < answers.length; q++) {
    //Functionality for deletion.
    const handleDeleteClick = event => {
      event.preventDefault();
      if(window.confirm("Delete this answer? [" + answers[q].text + "]") == true) {
        axios.post('http://localhost:8000/deleteanswer', {aid: answers[q].aid}).then(res => { });
        alert("Deleted answer! Change views to see the actual change on the website.")
      }
    }

    if (q < qindex + 5) {
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(answers[q].ans_date_time.substring(6, 8)) - 1;
      let day_num = answers[q].ans_date_time.substring(8, 10)
      let year_num = answers[q].ans_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = answers[q].ans_date_time.substring(11, 16);
      console.log("Answered by: " + answers[q].ans_by);
      answerRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={answers[q].aid}>
              <div class="card-body">
                <h5 className="card-title">
                  Answer Text: {answers[q].text}
                </h5>
                <div className="mb-3">
                  Answered By: <span className="asked"> {answers[q].ans_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              <div>
                <button className="btn btn-edit"> Edit </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button>
              </div>
            </div>
          </div>
        </div >
      )
      answerRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if (answers == 0) {
    answerRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body">
              <h5 className="card-title">
                Hello! If you are seeing this card this means either...
              </h5>
              <div className="mb-3">
                Case 1. There are no answers from this particular user.
                <br />
                Case 2. The answers cannot be retrieved for the database unless you refresh the application.
              </div>
            </div>
          </div>
        </div>
      </div>);
    answerRows.push(
      <div>
        <br />
      </div>
    )
  }
  return answerRows;
}
*/
/*
function displayTags(props, tags, qindex) {
  let tagRows = []
  for (let q = qindex; q < tags.length; q++) {
    //Functionality for deletion.
    const handleDeleteClick = event => {
      event.preventDefault();
      if(window.confirm("Delete this tag? [" + tags[q].name + "]") == true) {
        axios.post('http://localhost:8000/deletetag', {tid: tags[q].tid}).then(res => { });
        alert("Deleted tag! Change views to see the actual change on the website.")
      }
    }
    if (q < qindex + 5) {
      tagRows.push(
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div class="card w-100 border-primary" key={tags[q].aid}>
              <div class="card-body">
                <h5 className="card-title center-text">
                  {tags[q].name}
                </h5>
              </div>
              <div>
                <button className="btn btn-edit"> Edit </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button>
              </div>
            </div>
          </div>
        </div >
      )
      tagRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if (tags == 0) {
    tagRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100 border-primary">
            <div class="card-body">
              <h5 className="card-title">
                Hello! If you are seeing this card this means either...
              </h5>
              <div className="mb-3">
                Case 1. There are no tags from this particular user.
                <br />
                Case 2. The tags cannot be retrieved for the database unless you refresh the application.
              </div>
            </div>
          </div>
        </div>
      </div>);
    tagRows.push(
      <div>
        <br />
      </div>
    )
  }
  return tagRows;
}
*/



function QuestionsPage(props) {
  const [axiosquestions, setAxiosQuestions] = useState(1);
  const [axiosqt, setAxiosQT] = useState(0);
  const [axiosqa, setAxiosQA] = useState(0);
  const [qindex, setQIndex] = useState(0);
  const handleNextClick = event => {
    event.preventDefault();
    if (qindex + 5 < axiosquestions.length) {
      setQIndex(qindex + 5);
    }
    console.log(qindex);
  }
  const handlePrevClick = event => {
    event.preventDefault();
    if (qindex - 5 >= 0) {
      setQIndex(qindex - 5);
    }
    console.log(qindex);
  }

  useEffect(() => {
    axios.get('http://localhost:8000/allquestions').then((req) => {
      setAxiosQuestions(req.data);
    })
    axios.get('http://localhost:8000/axiosqt').then((req) => {
      setAxiosQT(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setAxiosQA(req.data);
    })
  }, [])

  /*I CANNOT MAKE IT A FUNCTION BECAUSE THEN I CANNOT PASS IN PROPS TO CHANGE FOR COMMENTS!*/
  let questionRows = []
  for (let q = qindex; q < axiosquestions.length; q++) {
    if (q < qindex + 5) {
      let qid = axiosquestions[q].qid;
      let dynamicid = 'link' + qid;
      let qkeyid = 'qkey' + qid;
      let tagHtml = [];
      //Find axios tags in axiosqt
      let axiostags = []
      for (let f = 0; f < axiosqt.length; f++) {
        if (axiosqt[f].qid == qid) {
          let tag = {
            name: axiosqt[f].name,
            tid: axiosqt[f].tid
          }
          axiostags.push(tag);
        }
      }
      for (let t = 0; t < axiostags.length; t++) {
        if (t % 4 == 0 && t > 1) {
          tagHtml.push(<br />);
        }
        let tkeyid = 'tkey' + qid + '_' + axiostags[t].tid;
        tagHtml.push(<button className="tag" key={tkeyid}> {axiostags[t].name} </button>);
      }
      //Find number of axios answers in axiosqa
      let num_answers = 0
      for (let a = 0; a < axiosqa.length; a++) {
        if (axiosqa[a].qid == qid) {
          num_answers += 1;
        }
      }
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(axiosquestions[q].ask_date_time.substring(6, 8)) - 1;
      let day_num = axiosquestions[q].ask_date_time.substring(8, 10)
      let year_num = axiosquestions[q].ask_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = axiosquestions[q].ask_date_time.substring(11, 16);
      let addFunctionality = []
      //If the flag is activated (profile page)
      /*if (f == 1) {
        //Functionality for deletion.
        const handleDeleteClick = event => {
          event.preventDefault();
          if(window.confirm("Delete this question? [" + axiosquestions[q].title + "]") == true) {
            axios.post('http://localhost:8000/deletequestion', {qid: axiosquestions[q].qid}).then(res => { });
            alert("Deleted question! Change views to see the actual change on the website.")
          }
        }
        addFunctionality.push(<div><button className="btn btn-edit"> Edit </button>
          <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button></div>);
      }*/

      questionRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={qkeyid}>
              <div class="card-body" onClick={() => props.statehandler('answerspage' + dynamicid, props.user)}>
                <h5 className="card-title">
                  Question Title: {axiosquestions[q].title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ? Upvotes {axiosquestions[q].views} Views {num_answers} Answers
                </h6>
                <div className="mb-3">
                  Tags: {tagHtml}
                </div>
                <div className="mb-3">
                  Asked By <span className="asked"> {axiosquestions[q].asked_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              {addFunctionality}
            </div>
          </div>
        </div >
      )
      questionRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if (axiosquestions == 1) {
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }

  if (axiosquestions.length == 0) {
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body">
            <div className="mb-3">
              <h5> There are no questions currently in the database. </h5>
            </div>
          </div>
        </div>
      </div>
    );
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }

  return (
    <div class="main">
      <br />
      <div class="card w-100">
        <div className="myrow row" id="qpagerow">
          <div className="col-md-4"> {axiosquestions.length} Questions </div>
          <div className="col-md-4"> All Questions </div>
          <AskQuestionButton statehandler={props.statehandler} user={props.user}></AskQuestionButton>
        </div>
        <br />
      </div>
      <br />
      {questionRows}
      <div class="d-flex flex-column" style={{ width: "100%" }}>
        <button className={(qindex == 0 ? "btn btn-secondary" : "btn btn-primary")} onClick={handlePrevClick}> Prev </button>
        <button className={(qindex + 5 >= axiosquestions.length ? "btn btn-secondary" : "btn btn-primary")} onClick={handleNextClick}> Next </button>
      </div>
    </div>
  );
}

function TagLinkPage(props) {
  let [axiostags, setAxiosTags] = useState(1);
  let [axiosqt, setAxiosQT] = useState([]);
  let [axiosqa, setQA] = useState([]);
  const [qindex, setQIndex] = useState(0);
  const handleNextClick = event => {
    event.preventDefault();
    if (qindex + 5 < questions.length) {
      setQIndex(qindex + 5);
    }
    console.log(qindex);
  }
  const handlePrevClick = event => {
    event.preventDefault();
    if (qindex - 5 >= 0) {
      setQIndex(qindex - 5);
    }
    console.log(questions.length);
    console.log(qindex);
  }
  useEffect(() => {
    axios.get('http://localhost:8000/alltags').then((req) => {
      setAxiosTags(req.data);
    })
    axios.get('http://localhost:8000/axiosqt').then((req) => {
      setAxiosQT(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setQA(req.data);
    })
  }, [])

  ////////
  //Find tag based on props.id.
  let tag = 0;
  for (let i = 0; i < axiostags.length; i++) {
    if (props.tid == axiostags[i].tid) {
      tag = axiostags[i];
    }
  }
  //Find questions based on tag.
  let questions = []
  if (tag != 0) {
    for (let q = 0; q < axiosqt.length; q++) {
      if (props.tid == axiosqt[q].tid) {
        let axiosquestion = {
          views: axiosqt[q].views,
          ask_date_time: axiosqt[q].ask_date_time,
          asked_by: axiosqt[q].asked_by,
          qid: axiosqt[q].qid,
          title: axiosqt[q].title,
          text: axiosqt[q].text
        }
        questions.push(axiosquestion);
      }
    }
  }

  //Add table with the questions array.
  let questionRows = []
  for (let q = qindex; q < questions.length; q++) {
    if (q < qindex + 5) {
      let qid = questions[q].qid;
      let dynamicid = 'link' + qid;
      let qkeyid = 'qkey' + qid;
      let tagHtml = [];
      //Find axios tags in axiosqt
      let axiostags = []
      for (let f = 0; f < axiosqt.length; f++) {
        if (axiosqt[f].qid == qid) {
          let tag = {
            name: axiosqt[f].name,
            tid: axiosqt[f].tid
          }
          axiostags.push(tag);
        }
      }
      for (let t = 0; t < axiostags.length; t++) {
        if (t % 4 == 0 && t > 1) {
          tagHtml.push(<br />);
        }
        let tkeyid = 'tkey' + qid + '_' + axiostags[t].tid;
        tagHtml.push(<button className="tag" key={tkeyid}> {axiostags[t].name} </button>);
      }
      //Find number of axios answers in axiosqa
      let num_answers = 0
      for (let a = 0; a < axiosqa.length; a++) {
        if (axiosqa[a].qid == qid) {
          num_answers += 1;
        }
      }
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(questions[q].ask_date_time.substring(6, 8)) - 1;
      let day_num = questions[q].ask_date_time.substring(8, 10)
      let year_num = questions[q].ask_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = questions[q].ask_date_time.substring(11, 16);
      let addFunctionality = []

      questionRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={qkeyid}>
              <div class="card-body" onClick={() => props.statehandler('answerspage' + dynamicid, props.user)}>
                <h5 className="card-title">
                  Question Title: {questions[q].title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ? Upvotes {questions[q].views} Views {num_answers} Answers
                </h6>
                <div className="mb-3">
                  Tags: {tagHtml}
                </div>
                <div className="mb-3">
                  Asked By <span className="asked"> {questions[q].asked_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              {addFunctionality}
            </div>
          </div>
        </div >
      )
      questionRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if(axiostags == 1){
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  else if (questions == 0) {
    questionRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body">
              <h5 className="card-title center-text">
              There are no questions that have this tag.
              </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  return (
    <div clas="main">
      <br />
      <div className="card w-100">
        <div className="myrow row" id="searchrow">
          <div className="col-md-4"> {questions.length} Questions </div>
          <div className="col-md-4"> Questions Tagged [{tag.name}] </div>
          <AskQuestionButton statehandler={props.statehandler} user={props.user}></AskQuestionButton>
        </div>
        <br />
      </div>
      <br />
      {questionRows}
      <div class="d-flex flex-column" style={{ width: "100%" }}>
        <button className={(qindex == 0 ? "btn btn-secondary" : "btn btn-primary")} onClick={handlePrevClick}> Prev </button>
        <button className={(qindex + 5 >= questions.length ? "btn btn-secondary" : "btn btn-primary")} onClick={handleNextClick}> Next </button>
      </div>
    </div>
  );
}

function TagsPage(props) {
  const [axiostags, setAxiosTags] = useState(1);
  const [qt, setQT] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/alltags').then((req) => {
      setAxiosTags(req.data);
    })
    axios.get('http://localhost:8000/axiosqt').then((req) => {
      setQT(req.data);
    })
  }, [])


  let tlength = axiostags.length;
  let tagHtml = [];
  for (let t = 0; t < tlength; t++) {
    if (t % 3 == 0) {
      tagHtml.push(<br />);
    }
    let numQuestions = 0;
    let tid = axiostags[t].tid;
    let tName = axiostags[t].name;
    //Find # of questions for a specific tag:
    for (let q = 0; q < qt.length; q++) {
      if (qt[q].tid == tid) {
        numQuestions += 1;
      }
    }
    let qText = numQuestions == 1 ? "Question" : "Questions"
    tagHtml.push(<div className="card w-25" onClick={() => props.statehandler('taglinkpage' + tid, props.user)}> <a id={tid} className="text-decoration-none"> {tName} </a> <br /> {numQuestions} {qText} </div>);
  }
  //If axiostags is not an array but the value 0...
  if (axiostags == 1) {
    tagHtml.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>
    );
    tagHtml.push(
      <div>
        <br />
      </div>
    )
  }

  if (axiostags.length == 0) {
    tagHtml.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body">
            <div className="mb-3">
              <h5> There are no tags in the database. </h5>
            </div>
          </div>
        </div>
      </div>
    );
    tagHtml.push(
      <div>
        <br />
      </div>
    )
  }
  return (<div className="main">
    <br />
    <div className="card w-100">
      <div className="myrow row">
        <div className="col-md-4"> {tlength} Tags </div>
        <div className="col-md-4"> All Tags </div>
        <AskQuestionButton statehandler={props.statehandler} user={props.user}></AskQuestionButton>
      </div>
      <br />
    </div>
    <br />
    <div className="myrow row" id="tpagerow">
      {tagHtml}
    </div>
  </div>);
}


/*Asking Questions Page**/
class QuestionsAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.errString = "";
    this.tagsArr = [];
    this.questionsArr = [];
  }

  componentDidMount() {
    axios.get('http://localhost:8000/alltags').then((req) => {
      this.tagsArr = req.data;
    })
    axios.get('http://localhost:8000/allquestions').then((req) => {
      this.questionsArr = req.data;
    })
  }

  handleQuestionSubmit() {
    this.errString = "";
    let allTagNames = []
    let allTagIds = []
    for (let t = 0; t < this.tagsArr.length; t++) {
      allTagNames.push(this.tagsArr[t].name);
      allTagIds.push(this.tagsArr[t].tid);
    }

    //THE INPUT STUFF
    let errors = false;
    let title = document.getElementById('qtitle').value;
    let text = document.getElementById('qtext').value;
    let qtags = document.getElementById('qtags').value;
    let user = this.props.user.username;
    if (title.length > 100) {
      this.errString += "Error: There are more than 100 characters in the Question Title.\n";
      errors = true;
    }
    if (title.length == 0) {
      this.errString += "Error: Question Title cannot be empty.\n";
      errors = true;
    }
    if (!text) {
      this.errString += "Error: Question Text cannot be empty.\n";
      errors = true;
    }
    if (!qtags) {
      this.errString += "Error: Tags cannot be empty.\n";
      errors = true;
    }
    if (!errors) {
      let tag_ids = [];
      //Find the highest tag id (we add 1 later.)
      let cur_tagid_count = 0;
      for (let i = 0; i < this.tagsArr.length; i++) {
        if (this.tagsArr[i].tid > cur_tagid_count) {
          cur_tagid_count = this.tagsArr[i].tid
        }
      }
      let tagz = qtags.split(" ");
      //Removes all whitespace
      tagz = tagz.filter(function (s) {
        return /\S/.test(s.toLowerCase());
      });
      console.log("Tagz: " + tagz)
      let tag_objs = { tags: [] }
      for (let i = 0; i < tagz.length; i++) {
        let tName = tagz[i].toLowerCase();
        //If the tag exists in the database, add the tag id to the array if not added already.
        if (allTagNames.includes(tName)) {
          //Find the index of where this tagName is to get the Id.
          for (let i = 0; i < allTagNames.length; i++) {
            if (tName == allTagNames[i]) {
              tag_ids.push(allTagIds[i]);
            }
          }
        }
        //If the tag does not exist in the database, create a new tag, add to the array and the database.
        else {
          const tag = {
            tid: cur_tagid_count + 1,
            name: tagz[i],
            created_by: user
          }
          cur_tagid_count += 1;
          tag_objs.tags.push(tag);
          tag_ids.push(tag.tid);
        }
      }

      //Send all the tag objects to create new ones.
      axios.post('http://localhost:8000/inserttag', tag_objs).then(res => {
      });

      //Create the question
      let newQuestionId = 0
      for (let i = 0; i < this.questionsArr.length; i++) {
        if (this.questionsArr[i].qid > newQuestionId) {
          newQuestionId = this.questionsArr[i].qid
        }
      }
      newQuestionId += 1;
      let question = {
        views: 0,
        //ask_date_time: today, DEFAULT ALREADY!
        asked_by: user,
        qid: newQuestionId,
        title: title,
        text: text
        /*
        askedOn: months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear(),
        askedAt: today.getHours() + ':' + minutes,*/
      }
      //Add question
      axios.post('http://localhost:8000/insertquestion', question).then(res => { });
      //Add pair.
      let tag_id_pairs = { pairs: [] }
      for (let p = 0; p < tag_ids.length; p++) {
        let pair = {
          qstnId: newQuestionId,
          tagId: tag_ids[p]
        }
        tag_id_pairs.pairs.push(pair);
      }
      axios.post('http://localhost:8000/insertqt', tag_id_pairs).then(res => { });
      this.props.statehandler('qpage', this.props.user);
    }
    else {
      alert(this.errString);
    }
  };
  render() {
    return (
      <div className="main">
        <div className="row lt"> <div className="subtitle"> Question Title </div> <br /> <textarea id="qtitle" placeholder="Note: Your title should not be more than 100 characters!"></textarea></div>
        <div className="row lt"> <div className="subtitle"> Question Text </div> <br /> <textarea id="qtext" placeholder="Note: Make sure to add important details to your question."></textarea></div>
        <div className="row lt"> <div className="subtitle"> Tags </div> <br /> <textarea id="qtags" placeholder="Note: Add tags/keywords separated by whitespace, this cannot be empty!"></textarea></div>
        <div className="row"> <button type="submit" id="postquestion" onClick={this.handleQuestionSubmit}> Post Question </button> </div>
        <br />
      </div>
    );
  }
}

/*Asking Answers page*/
function AnswerQuestionsPage(props) {
  //Data Stuff
  const [axiosanswers, setAxiosAnswers] = useState(0);
  const [qa, setQA] = useState([]);
  const [axiosquestions, setAxiosQuestions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/allanswers').then((req) => {
      setAxiosAnswers(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setQA(req.data);
    })
    axios.get('http://localhost:8000/allquestions').then((req) => {
      setAxiosQuestions(req.data);
    })
  }, [])

  ///
  let errString = ""
  const [inserttext, setText] = useState('');
  const handleTextChange = event => {
    setText(event.target.value);
  }
  const handleAnswerSubmit = event => {
    event.preventDefault();
    errString = ""
    let errors = false;
    if (!inserttext) {
      errString += "Error: Answer Text cannot be empty.\n";
      errors = true;
    }
    if (!errors) {
      //Get the corresponding question and create answer object for it.
      let question = 0;
      for (let q = 0; q < axiosquestions.length; q++) {
        if (axiosquestions[q].qid == props.qid) {
          question = axiosquestions[q];
        }
      }
      //Find next answerId
      let newAnswerId = 0;
      for (let i = 0; i < axiosanswers.length; i++) {
        if (axiosanswers[i].aid > newAnswerId) {
          newAnswerId = axiosanswers[i].aid
        }
      }
      newAnswerId += 1; //Add one after the maximum.
      const answer_obj = {
        aid: newAnswerId,
        text: inserttext,
        ans_by: props.user.username
      }
      let pair = {
        qstnId: props.qid,
        ansId: answer_obj.aid
      }
      axios.post('http://localhost:8000/insertanswer', answer_obj).then(res => {
      });
      axios.post('http://localhost:8000/insertqa', pair).then(res => { });
      props.statehandler('answerspagelink' + question.qid, props.user);
    }
    else {
      alert(errString);
    }
  }
  //alert(props.qid);
  return (
    <div className="main">
      <form onSubmit={handleAnswerSubmit}>
        <div className="row lt"> <div className="subtitle"> Answer Text </div> <br /> <textarea id="atext" type="text" name="text" onChange={handleTextChange} value={inserttext} placeholder="Note: Make sure you actually give a decent response, it has to be something."></textarea></div>
        <div className="row"> <button type="submit" id="postanswer"> Post Answer </button> </div>
      </form>
    </div>
  );
}

function CommentsButton(props) {
  let commentbutton = []
  let [allComments, setComments] = useState(0);
  useEffect(() => {
    //Increasing Views (A little scuffed..)
    axios.get('http://localhost:8000/allcomments').then((req) => {
      setComments(req.data);
    })
  }, [])
  //Needs user, specific id --> (input is either q# or a#), input
  if (props.user.username.localeCompare("guest account") != 0) {
    const handleCommentPress = event => {
      if (event.key === "Enter") {
        if (event.target.value.length == 0) {
          alert("Your question comment must have text!");
        }
        else {
          //0 is for questions
          if (props.obj.type == 0) {
            let newid = allComments.length + 1
            let comTrip = {
              comment: {
                cid: newid,
                text: event.target.value,
                com_by: props.user.username
              },
              type: 0,
              qstnId: props.obj.id
            }
            axios.post('http://localhost:8000/insertcomment', comTrip).then(res => {
            });
            props.statehandler('qpage', props.user);
          }
          //1 is for answers.
          else {

          }
        }
      }
    }
    commentbutton.push(
      <input type="text" id="search" className="form-control" placeholder="Insert Comment..." onKeyPress={handleCommentPress}></input>
    );
  }
  return (<div>{commentbutton}</div>);
}



/*Answers Page*/
function AnswersPage(props) {
  let [axiosquestions, setAxiosQuestions] = useState(1);
  let [axiosqc, setAxiosQC] = useState([]);
  let [axiosqa, setAxiosQA] = useState([]);
  let [qcindex, setQCIndex] = useState(0);
  const handleQCNextClick = event => {
    event.preventDefault();
    if (qcindex + 3 < qcomments.length) {
      setQCIndex(qcindex + 3);
    }
  }
  const handleQCPrevClick = event => {
    event.preventDefault();
    if (qcindex - 3 >= 0) {
      setQCIndex(qcindex - 3);
    }
  }
  useEffect(() => {
    //Increasing Views (A little scuffed..)
    axios.post('http://localhost:8000/increaseviews', { qid: props.qid }).then(res => { });
    axios.get('http://localhost:8000/allquestions').then((req) => {
      setAxiosQuestions(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setAxiosQA(req.data);
    })
    axios.get('http://localhost:8000/axiosqc').then((req) => {
      setAxiosQC(req.data);
    })
  }, [])
  //Getting specific question and answers:
  let question = 0;
  let answers = [];
  //Find question with the same qid in all questions.
  for (let q = 0; q < axiosquestions.length; q++) {
    if (props.qid == axiosquestions[q].qid) {
      question = axiosquestions[q];
      break;
    }
  }
  //Finding answers for specific question.
  for (let a = 0; a < axiosqa.length; a++) {
    if (props.qid == axiosqa[a].qid) {
      let ans = {
        aid: axiosqa[a].aid,
        ans_date_time: axiosqa[a].ans_date_time,
        ans_by: axiosqa[a].ans_by,
        text: axiosqa[a].text
      }
      answers.push(ans)
    }
  }
  let qcomments = [];
  //Find all comments for a specific question:
  for (let q = 0; q < axiosqc.length; q++) {
    if (props.qid == axiosqc[q].qid) {
      let com = {
        cid: axiosqc[q].cid,
        text: axiosqc[q].text,
        com_date_time: axiosqc[q].com_date_time,
        com_by: axiosqc[q].com_by
      }
      qcomments.push(com);
    }
  }
  qcomments.sort((a, b) => b.cid - a.cid);
  answers.sort((a, b) => b.aid - a.aid);
  console.log(answers);
  //Increase # of views when going to answer page:
  let aLength = answers.length;
  let aArr = [];
  //Months array constant for both question and answers:
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let a = 0; a < aLength; a++) {
    //Finding the Date Stuff
    let month_num = parseInt(answers[a].ans_date_time.substring(6, 8)) - 1;
    let day_num = answers[a].ans_date_time.substring(8, 10)
    let year_num = answers[a].ans_date_time.substring(0, 4)
    let on = months[month_num] + ' ' + day_num + ', ' + year_num;
    let time = answers[a].ans_date_time.substring(11, 16);
    let qakeyid = 'q' + props.qid + 'akey' + answers[a].aid
    aArr.push(
      <tr key={qakeyid}>
        <td className="answer text">
          {answers[a].text}
        </td>
        <td className="tright">
          Ans By <span className="asked"> {answers[a].ans_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
        </td>
      </tr>
    )
  }

  //Adding html for QUESTION comments:
  let qCommentArr = []
  for (let q = qcindex; q < qcomments.length; q++) {
    if (q < qcindex + 3) {
      let month_num = parseInt(qcomments[q].com_date_time.substring(6, 8)) - 1;
      let day_num = qcomments[q].com_date_time.substring(8, 10)
      let year_num = qcomments[q].com_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = qcomments[q].com_date_time.substring(11, 16);
      //let qckeyid = 'q' + props.qid + 'ckey' + qcomments[q].cid
      qCommentArr.push(
        <div className="row">
          <div className="col-md-12">
            <div class="card w-100 border-primary">
              <div class="card-body">
                {qcomments[q].text}
                <div className="mb-3">
                  Commented By <span className="asked"> {qcomments[q].com_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


  //Date stuff for Question
  let q_on = "Refresh with CTRL + R to render";
  let q_time = "Refresh with CTRL + R to render!";
  if (question != 0) {
    let q_month_num = parseInt(question.ask_date_time.substring(6, 8)) - 1;
    let q_day_num = question.ask_date_time.substring(8, 10)
    let q_year_num = question.ask_date_time.substring(0, 4)
    q_on = months[q_month_num] + ' ' + q_day_num + ', ' + q_year_num;
    q_time = question.ask_date_time.substring(11, 16);
  }
  if(axiosquestions == 1){
    return(
    <div className="main">
      <br />
      <div className="col-md-6 offset-md-3">
    <div class="card w-100">
      <div class="card-body bg-danger white">
        <div className="mb-3">
          <h5> The database has crashed for a mysterious reason. </h5>
          <h5> Sign out or Refresh the Page. </h5>
        </div>
      </div>
    </div>
  </div>
  </div>);
  }
  return (
    <div className="main">
      <br />
      <div className="card w-100">
        <div className="myrow row" id="apagerow">
          <div className="col-md-4"> {answers.length} Answers </div>
          <div className="col-md-4"> Question Title: {question.title} </div>
          <AskQuestionButton statehandler={props.statehandler} user={props.user}></AskQuestionButton>
        </div>
        <br />
      </div>
      <br />
      <div className="card w-100">
        <div className="myrow row" id="apagerow2">
          <div className="col-md-4"> {question.views} Views </div>
          <div className="col-md-4"> {question.text} </div>
          <div className="col-md-4"> Asked By <span className="asked"> {question.asked_by} </span> <br /> On <span className="on"> {q_on} </span> <br /> At <span className="at"> {q_time} </span></div>
        </div>
      </div>
      <br />
      {qCommentArr}
      <div class="d-flex flex-column" style={{ width: "100%" }}>
        <button className={(qcindex == 0 ? "btn btn-secondary" : "btn btn-primary")} onClick={handleQCPrevClick}> Prev Question Comment </button>
        <button className={(qcindex + 3 >= qcomments.length ? "btn btn-secondary" : "btn btn-primary")} onClick={handleQCNextClick}> Next Question Comment </button>
      </div>
      <div className="card w-100 bg-primary">
        <CommentsButton statehandler={props.statehandler} user={props.user} obj={{ type: 0, id: question.qid }}> </CommentsButton>
      </div>
      <hr />
      <table id="atable">
        <tbody>
          {aArr}
        </tbody>
      </table>
      <AnswerButton statehandler={props.statehandler} qid={props.qid} user={props.user}></AnswerButton>
    </div>
  );
}

function SearchPage(props) {
  let [axiosquestions, setAxiosQuestions] = useState(1);
  let [axiosqt, setAxiosQT] = useState([]);
  let [axiosqa, setAxiosQA] = useState([]);
  const [qindex, setQIndex] = useState(0);
  const handleNextClick = event => {
    event.preventDefault();
    if (qindex + 5 < qlength) {
      setQIndex(qindex + 5);
    }
    console.log(qindex);
  }
  const handlePrevClick = event => {
    event.preventDefault();
    if (qindex - 5 >= 0) {
      setQIndex(qindex - 5);
    }
    console.log(qindex);
  }
  useEffect(() => {
    //Increasing Views (A little scuffed..)
    axios.get('http://localhost:8000/allquestions').then((req) => {
      setAxiosQuestions(req.data);
    })
    axios.get('http://localhost:8000/axiosqt').then((req) => {
      setAxiosQT(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setAxiosQA(req.data);
    })
  }, [])


  //BEGIN SEARCHING:
  let search_string = props.searchinp.toLowerCase();
  let q_ids = []
  //Split search terms and do not include empty spaces as input.
  const search_arr = search_string.split(" ").filter(function (x) {
    return x != '';
  });
  console.log("All Search Terms: " + search_arr);
  for (let s = 0; s < search_arr.length; s++) {
    //Search for tags:
    if (search_arr[s].charAt(0) == '[' && search_arr[s].charAt(search_arr[s].length - 1) == ']' && search_arr[s].length > 2) {
      let tagName = search_arr[s].substring(1, search_arr[s].length - 1).toLowerCase();
      console.log("TagName: " + tagName);
      //Find qid of specific tag.
      for (let t = 0; t < axiosqt.length; t++) {
        if (axiosqt[t].name == tagName) {
          q_ids = q_ids.concat(axiosqt[t].qid);
        }
      }
    }
    else {
      for (let q = 0; q < axiosquestions.length; q++) {
        if (axiosquestions[q].text.toLowerCase().split(" ").includes(search_arr[s]) || axiosquestions[q].title.toLowerCase().split(" ").includes(search_arr[s])) {
          q_ids = q_ids.concat(axiosquestions[q].qid);
        }
      }
    }
  }
  //Remove duplicate qids.
  q_ids = q_ids.filter(function (item, pos) {
    return q_ids.indexOf(item) == pos;
  })
  console.log("QIDS: " + q_ids);
  //Render questions given the qids.
  let qlength = q_ids.length;
  let questionRows = []
  for (let q = qindex; q < qlength; q++) {
    if (q < qindex + 5) {
      let question = 0;
      //Find the question with that specific qid.
      for (let aq = 0; aq < axiosquestions.length; aq++) {
        console.log("axiosquestion: " + axiosquestions[aq].qid + ", QID: " + q_ids[q]);
        if (axiosquestions[aq].qid == q_ids[q]) {
          question = axiosquestions[aq];
        }
      }
      //Statehandler stuff.
      let dynamicid = 'link' + q_ids[q]
      let qkeyid = 'qkey' + q_ids[q]
      //Getting tags for each specific question, being the variable question.
      let tags = [];
      for (let i = 0; i < axiosqt.length; i++) {
        if (axiosqt[i].qid == question.qid) {
          let tag = {
            tid: axiosqt[i].tid,
            name: axiosqt[i].name
          }
          tags.push(tag);
        }
      }
      //Converting tags to HTML:
      let tagHtml = [];
      for (let t = 0; t < tags.length; t++) {
        if (t % 4 == 0 && t > 1) {
          tagHtml.push(<br />);
        }
        let tkeyid = 'tkey' + question.qid + '_' + tags[t].tid;
        tagHtml.push(<button className="tag" key={tkeyid}> {tags[t].name} </button>);
      }
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(question.ask_date_time.substring(6, 8)) - 1;
      let day_num = question.ask_date_time.substring(8, 10)
      let year_num = question.ask_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = question.ask_date_time.substring(11, 16);

      //Finding number of answers for a question.
      let ans_count = 0;
      for (let a = 0; a < axiosqa.length; a++) {
        if (axiosqa[a].qid == question.qid) {
          ans_count += 1;
        }
      }
      questionRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={qkeyid}>
              <div class="card-body" onClick={() => props.statehandler('answerspage' + dynamicid, props.user)}>
                <h5 className="card-title">
                  Question Title: {axiosquestions[q].title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ? Upvotes {axiosquestions[q].views} Views {ans_count} Answers
                </h6>
                <div className="mb-3">
                  Tags: {tagHtml}
                </div>
                <div className="mb-3">
                  Asked By <span className="asked"> {axiosquestions[q].asked_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
            </div>
          </div>
        </div >
      )
      questionRows.push(
        <div>
          <br />
        </div>
      )
    }
  }
  if (axiosquestions == 1) {
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  else if (qlength == 0) {
    questionRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body">
              <h5 className="card-title center-text">
                No Results Found
              </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  return (
    <div clas="main">
      <br />
      <div className="card w-100">
        <div className="myrow row" id="searchrow">
          <div className="col-md-4"> {qlength} Questions </div>
          <div className="col-md-4"> Search Results </div>
          <AskQuestionButton statehandler={props.statehandler} user={props.user}></AskQuestionButton>
        </div>
        <br />
      </div>
      <br />
      {questionRows}
      <div class="d-flex flex-column" style={{ width: "100%" }}>
        <button className={(qindex == 0 ? "btn btn-secondary" : "btn btn-primary")} onClick={handlePrevClick}> Prev </button>
        <button className={(qindex + 5 >= qlength ? "btn btn-secondary" : "btn btn-primary")} onClick={handleNextClick}> Next </button>
      </div>
    </div>
  );
}

function ProfilePage(props) {
  const [axiosquestions, setAxiosQuestions] = useState(1);
  const [axiosanswers, setAxiosAnswers] = useState(1);
  const [axiostags, setAxiosTags] = useState(1);
  const [axiosqt, setAxiosQT] = useState(0);
  const [axiosqa, setAxiosQA] = useState(0);
  const [qindex, setQIndex] = useState(0);
  const [cs, setCS] = useState('questions');
  const handleNextClick = event => {
    event.preventDefault();
    if (qindex + 5 < length) {
      setQIndex(qindex + 5);
    }
  }
  const handlePrevClick = event => {
    event.preventDefault();
    if (qindex - 5 >= 0) {
      setQIndex(qindex - 5);
    }
    console.log(qindex);
  }
  const handleQuestionsClick = event => {
    event.preventDefault();
    setQIndex(0);
    setCS("questions");
    console.log(array);
  }
  const handleAnswersClick = event => {
    event.preventDefault();
    setQIndex(0);
    setCS("answers");
    console.log(array);
  }
  const handleTagsClick = event => {
    event.preventDefault();
    setQIndex(0);
    setCS("tags");
    console.log(array);
  }

  useEffect(() => {
    axios.get('http://localhost:8000/allquestions').then((req) => {
      setAxiosQuestions(req.data);
    })
    axios.get('http://localhost:8000/allanswers').then((req) => {
      setAxiosAnswers(req.data);
    })
    axios.get('http://localhost:8000/alltags').then((req) => {
      setAxiosTags(req.data);
    })
    axios.get('http://localhost:8000/axiosqt').then((req) => {
      setAxiosQT(req.data);
    })
    axios.get('http://localhost:8000/axiosqa').then((req) => {
      setAxiosQA(req.data);
    })
  }, [])

  //Array will be set to either questionrows, answerrows or tagrows. this is used for the handle next/prev
  let array = []

  //////////////////////////////////////
  //START OF QUESTIONS ARRAY:
  //////////////////////////////////////
  //Questions Array for questions option.
  let questions = []
  for (let i = 0; i < axiosquestions.length; i++) {
    if (props.user.username.localeCompare(axiosquestions[i].asked_by) == 0) {
      let axiosquestion = {
        views: axiosquestions[i].views,
        ask_date_time: axiosquestions[i].ask_date_time,
        asked_by: axiosquestions[i].asked_by,
        qid: axiosquestions[i].qid,
        title: axiosquestions[i].title,
        text: axiosquestions[i].text
      }
      questions.push(axiosquestion);
    }
  }
  //let questionRows = displayQuestions(props, questions, axiosqt, axiosqa, qindex, 1);
  let questionRows = []
  for (let q = qindex; q < axiosquestions.length; q++) {
    if (q < qindex + 5) {
      let qid = axiosquestions[q].qid;
      let dynamicid = 'link' + qid;
      let qkeyid = 'qkey' + qid;
      let tagHtml = [];
      //Find axios tags in axiosqt
      let axiostags = []
      for (let f = 0; f < axiosqt.length; f++) {
        if (axiosqt[f].qid == qid) {
          let tag = {
            name: axiosqt[f].name,
            tid: axiosqt[f].tid
          }
          axiostags.push(tag);
        }
      }
      for (let t = 0; t < axiostags.length; t++) {
        if (t % 4 == 0 && t > 1) {
          tagHtml.push(<br />);
        }
        let tkeyid = 'tkey' + qid + '_' + axiostags[t].tid;
        tagHtml.push(<button className="tag" key={tkeyid}> {axiostags[t].name} </button>);
      }
      //Find number of axios answers in axiosqa
      let num_answers = 0
      for (let a = 0; a < axiosqa.length; a++) {
        if (axiosqa[a].qid == qid) {
          num_answers += 1;
        }
      }
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(axiosquestions[q].ask_date_time.substring(6, 8)) - 1;
      let day_num = axiosquestions[q].ask_date_time.substring(8, 10)
      let year_num = axiosquestions[q].ask_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = axiosquestions[q].ask_date_time.substring(11, 16);
      //If the flag is activated (profile page)
      //Functionality for deletion.
      const handleDeleteClick = event => {
        event.preventDefault();
        if (window.confirm("Delete this question? [" + axiosquestions[q].title + "]") == true) {
          axios.post('http://localhost:8000/deletequestion', { qid: axiosquestions[q].qid }).then(res => { });
          props.statehandler('qpage', props.user);
        }
      }
      const handleEditClick = event => {
        event.preventDefault();
        props.statehandler('qepage' + axiosquestions[q].qid, props.user)
      }

      questionRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={qkeyid}>
              <div class="card-body" onClick={() => props.statehandler('answerspage' + dynamicid, props.user)}>
                <h5 className="card-title">
                  Question Title: {axiosquestions[q].title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ? Upvotes {axiosquestions[q].views} Views {num_answers} Answers
                </h6>
                <div className="mb-3">
                  Tags: {tagHtml}
                </div>
                <div className="mb-3">
                  Asked By <span className="asked"> {axiosquestions[q].asked_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              <div>
                <button className="btn btn-edit" onClick={handleEditClick}> Edit </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button></div>
            </div>
          </div>
        </div >
      )
      questionRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  //ERROR HANDLING IF DATABASE CRASHES DUE TO REQUESTS.

  if (axiosquestions == 1) {
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>);
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }

  if (axiosquestions.length == 0) {
    questionRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body">
            <div className="mb-3">
              <h5> There are no questions from this particular user. </h5>
            </div>
          </div>
        </div>
      </div>
    );
    questionRows.push(
      <div>
        <br />
      </div>
    )
  }
  //////////////////////////////////////
  //END OF QUESTIONS ARRAY
  //////////////////////////////////////


  //START OF ANSWERS ARRAY//
  //Answers Array for answers option.
  let answers = []
  for (let i = 0; i < axiosanswers.length; i++) {
    if (props.user.username.localeCompare(axiosanswers[i].ans_by) == 0) {
      let axiosanswer = {
        ans_by: axiosanswers[i].ans_by,
        aid: axiosanswers[i].aid,
        ans_date_time: axiosanswers[i].ans_date_time,
        text: axiosanswers[i].text
      }
      answers.push(axiosanswer);
    }
  }
  let answerRows = []
  for (let q = qindex; q < answers.length; q++) {
    //Functionality for deletion.
    const handleDeleteClick = event => {
      event.preventDefault();
      if (window.confirm("Delete this answer? [" + answers[q].text + "]") == true) {
        axios.post('http://localhost:8000/deleteanswer', { aid: answers[q].aid }).then(res => { });
        props.statehandler('qpage', props.user);
      }
    }
    const handleEditClick = event => {
      event.preventDefault();
      props.statehandler('aepage' + answers[q].aid, props.user)
    }

    if (q < qindex + 5) {
      //Finding the Date Stuff
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //Format: 2022-04-19T19:37:24.000Z
      //We do -1 because index 0 is January.
      let month_num = parseInt(answers[q].ans_date_time.substring(6, 8)) - 1;
      let day_num = answers[q].ans_date_time.substring(8, 10)
      let year_num = answers[q].ans_date_time.substring(0, 4)
      let on = months[month_num] + ' ' + day_num + ', ' + year_num;
      let time = answers[q].ans_date_time.substring(11, 16);
      console.log("Answered by: " + answers[q].ans_by);
      answerRows.push(
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div class="card w-100" key={answers[q].aid}>
              <div class="card-body">
                <h5 className="card-title">
                  Answer Text: {answers[q].text}
                </h5>
                <div className="mb-3">
                  Answered By: <span className="asked"> {answers[q].ans_by} </span> <br /> On <span className="on"> {on} </span> <br /> At <span className="at"> {time} </span>
                </div>
              </div>
              <div>
                <button className="btn btn-edit" onClick={handleEditClick}> Edit </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button>
              </div>
            </div>
          </div>
        </div >
      )
      answerRows.push(
        <div>
          <br />
        </div>
      )
    }
  }

  if (axiosanswers == 1) {
    answerRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body bg-danger white">
              <div className="mb-3">
                <h5> The database has crashed for a mysterious reason. </h5>
                <h5> Sign out or Refresh the Page. </h5>
              </div>
            </div>
          </div>
        </div>
      </div>);
    answerRows.push(
      <div>
        <br />
      </div>
    )
  }
  else if(answers.length == 0){
    answerRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100">
            <div class="card-body">
              <div className="mb-3">
                <h5> There are no answers from this particular user. </h5>
              </div>
            </div>
          </div>
        </div>
      </div>);
    answerRows.push(
      <div>
        <br />
      </div>
    )
  }
  //////////////////////////
  //START OF TAGS
  ////////////////////////
  //Tags Array for tags optoin
  let tags = []
  for (let i = 0; i < axiostags.length; i++) {
    if (props.user.username.localeCompare(axiostags[i].created_by) == 0) {
      let axiostag = {
        tid: axiostags[i].tid,
        name: axiostags[i].name,
        created_by: axiostags[i].created_by
      }
      tags.push(axiostag);
    }
  }
  let tagRows = []
  for (let q = qindex; q < tags.length; q++) {
    //Functionality for deletion.
    const handleDeleteClick = event => {
      event.preventDefault();
      if (window.confirm("Delete this tag? [" + tags[q].name + "]") == true) {
        axios.post('http://localhost:8000/deletetag', { tid: tags[q].tid }).then(res => { });
        props.statehandler('tpage', props.user);
      }
    }
    const handleEditClick = event => {
      event.preventDefault();
      props.statehandler('tepage' + tags[q].tid, props.user)
    }
    if (q < qindex + 5) {
      tagRows.push(
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div class="card w-100 border-primary" key={tags[q].aid}>
              <div class="card-body">
                <h5 className="card-title center-text">
                  {tags[q].name}
                </h5>
              </div>
              <div>
                <button className="btn btn-edit" onClick={handleEditClick}> Edit </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}> Delete </button>
              </div>
            </div>
          </div>
        </div >
      )
      tagRows.push(
        <div>
          <br />
        </div>
      )
    }
  }
  if(axiostags == 1){
    tagRows.push(
      <div className="col-md-6 offset-md-3">
        <div class="card w-100">
          <div class="card-body bg-danger white">
            <div className="mb-3">
              <h5> The database has crashed for a mysterious reason. </h5>
              <h5> Sign out or Refresh the Page. </h5>
            </div>
          </div>
        </div>
      </div>
    );
    tagRows.push(
      <div>
        <br />
      </div>
    )
  }
  else if (tags.length == 0) {
    tagRows.push(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div class="card w-100 border-primary">
            <div class="card-body">
              <div className="mb-3">
              <h5> There are no tags from this particular user. </h5>
              </div>
            </div>
          </div>
        </div>
      </div>);
    tagRows.push(
      <div>
        <br />
      </div>
    )
  }

  let length = 0
  //Setting array.
  if (cs.localeCompare("questions") == 0) {
    array = questionRows;
    length = questions.length;
  }
  else if (cs.localeCompare("answers") == 0) {
    array = answerRows;
    length = answers.length;
  }
  else if (cs.localeCompare("tags") == 0) {
    array = tagRows;
    length = tags.length;
  }

  //Finding the Date Stuff
  let user = props.user;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //Format: 2022-04-19T19:37:24.000Z
  //We do -1 because index 0 is January.
  let month_num = parseInt(user.creation_time.substring(6, 8)) - 1;
  let day_num = user.creation_time.substring(8, 10)
  let year_num = user.creation_time.substring(0, 4)
  let on = months[month_num] + ' ' + day_num + ', ' + year_num;
  return (
    <div className="main">
      <br />
      <div className="card w-100">
        <div className="myrow row" id="searchrow">
          <div className="col-md-4"> Reputation: {props.user.reputation} </div>
          <div className="col-md-4"> {props.user.username}'s profile </div>
          <div className="col-md-4"> User Since: {on} </div>
        </div>
        <br />
      </div>
      <br />
      <div class="d-flex flex-column " style={{ width: "18%", height: "100%", float: "left" }}>
        <button className={((cs.localeCompare("questions") == 0) ? "btn btn-primary" : "btn btn-secondary")} onClick={handleQuestionsClick}> Questions </button>
        <br />
        <button className={((cs.localeCompare("answers") == 0) ? "btn btn-primary" : "btn btn-secondary")} onClick={handleAnswersClick}> Answers </button>
        <br />
        <button className={((cs.localeCompare("tags") == 0) ? "btn btn-primary" : "btn btn-secondary")} onClick={handleTagsClick}> Tags </button>
      </div>
      <div class="d-flex flex-column bg-light" style={{ width: "80%", height: "100%", float: "right" }}>
        <br />
        <StateProfileBox cstate={cs} user={props.user} array={array}></StateProfileBox>
        <button className={(qindex == 0 ? "btn btn-secondary" : "btn btn-primary")} onClick={handlePrevClick}> Prev </button>
        <button className={(qindex + 5 >= length ? "btn btn-secondary" : "btn btn-primary")} onClick={handleNextClick}> Next </button>
      </div>
    </div>
  );
}

function StateProfileBox(props) {
  if (props.cstate.localeCompare("questions") == 0) {
    return (
      <div>
        <div className="card col-md-6 offset-md-3 center-text">
          {props.user.username}'s Questions:
          <br />
        </div>
        <br />
        {props.array}
      </div>
    );
  }
  else if (props.cstate.localeCompare("answers") == 0) {
    return (
      <div>
        <div className="card col-md-6 offset-md-3 center-text">
          {props.user.username}'s Answers:
          <br />
        </div>
        <br />
        {props.array}
      </div>
    );
  }
  else if (props.cstate.localeCompare("tags") == 0) {
    return (
      <div>
        <div className="card col-md-6 offset-md-3 center-text">
          {props.user.username}'s Tags:
          <br />
        </div>
        <br />
        {props.array}
      </div>
    );
  }
}

function QuestionEditPage(props) {
  let errString = "";
  const [newtext, setText] = useState('');
  const [newtitle, setTitle] = useState('');
  const handleTextChange = event => {
    setText(event.target.value);
  }
  const handleTitleChange = event => {
    setTitle(event.target.value);
  }
  const editQuestionSubmit = event => {
    event.preventDefault();
    let errors = false;
    errString = "";
    if (newtext.length == 0) {
      errors = true;
      alert("Error: New question text cannot be empty!")
    }
    if (newtext.title == 0) {
      alert("Error: New question title cannot be empty!")
    }
    if (!errors) {
      let qObj = {
        title: newtitle,
        text: newtext,
        qid: props.qid //This is used just to find which tag to change in the server.
      }
      axios.post('http://localhost:8000/editquestion', qObj).then(res => {
      });
      props.statehandler('profilepage', props.user);
    }
    else {
      alert(errString)
    }
  }
  return (
    <div className="main">
      <form onSubmit={editQuestionSubmit}>
        <div className="row lt"> <div className="subtitle"> Edit Question Title </div> <br /> <textarea id="atext" type="text" name="text" onChange={handleTitleChange} value={newtitle} placeholder="Type in your new title."></textarea></div>
        <div className="row lt"> <div className="subtitle"> Edit Question Text </div> <br /> <textarea id="atext" type="text" name="text" onChange={handleTextChange} value={newtext} placeholder="Type in your new text."></textarea></div>
        <div className="row"> <button type="submit" id="postquestion"> Change Question </button> </div>
      </form>
    </div>
  );
}

function TagEditPage(props) {
  const [newname, setName] = useState('');
  const handleNameChange = event => {
    setName(event.target.value);
  }
  const editTagSubmit = event => {
    event.preventDefault();
    if (newname.length == 0) {
      alert("Error: Tag Name cannot be empty!")
    }
    else {
      let tag_obj = {
        name: newname,
        tid: props.tid //This is used just to find which tag to change in the server.
      }
      axios.post('http://localhost:8000/edittag', tag_obj).then(res => {
      });
      props.statehandler('profilepage', props.user);
    }
  }
  return (
    <div className="main">
      <form onSubmit={editTagSubmit}>
        <div className="row lt"> <div className="subtitle"> New Tag Name </div> <br /> <textarea id="atext" type="text" name="text" onChange={handleNameChange} value={newname} placeholder="Type in a new name for this tag!"></textarea></div>
        <div className="row"> <button type="submit" id="postanswer"> Change Tag </button> </div>
      </form>
    </div>
  );
}

function AnswerEditPage(props) {
  const [newtext, setText] = useState('');
  const handleTextChange = event => {
    setText(event.target.value);
  }
  const editAnswerSubmit = event => {
    event.preventDefault();
    if (newtext.length == 0) {
      alert("Error: New answer text cannot be empty!")
    }
    else {
      let ans_obj = {
        text: newtext,
        aid: props.aid //This is used just to find which tag to change in the server.
      }
      axios.post('http://localhost:8000/editanswer', ans_obj).then(res => {
      });
      props.statehandler('profilepage', props.user);
    }
  }
  return (
    <div className="main">
      <form onSubmit={editAnswerSubmit}>
        <div className="row lt"> <div className="subtitle"> New Answer </div> <br /> <textarea id="atext" type="text" name="text" onChange={handleTextChange} value={newtext} placeholder="Type in a new answer."></textarea></div>
        <div className="row"> <button type="submit" id="postanswer"> Change Answer </button> </div>
      </form>
    </div>
  );
}


function RenderPage(props) {
  let statehandler = props.statehandler;
  //Conditionals for Page:
  if (props.page == "qpage") return (<QuestionsPage statehandler={statehandler} user={props.user}> </QuestionsPage>);
  if (props.page == "tpage") return (<TagsPage statehandler={statehandler} user={props.user}> </TagsPage>);
  if (props.page == "qaskpage") return (<QuestionsAskPage statehandler={statehandler} user={props.user}> </QuestionsAskPage>);
  if (props.page == "profilepage") return (<ProfilePage statehandler={statehandler} user={props.user}> </ProfilePage>);
  if (props.page.includes("answerspage")) return (<AnswersPage statehandler={statehandler} user={props.user} qid={props.page.slice(15)}> </AnswersPage>);
  if (props.page.includes("answerquestionspage")) return (<AnswerQuestionsPage statehandler={statehandler} user={props.user} qid={props.page.slice(19)}> </AnswerQuestionsPage>);
  if (props.page.includes("searchpage")) return (<SearchPage statehandler={statehandler} user={props.user} searchinp={props.page.slice(10)}> </SearchPage>)
  if (props.page.includes("taglinkpage")) return (<TagLinkPage statehandler={statehandler} user={props.user} tid={props.page.slice(11)}> </TagLinkPage>);
  if (props.page.includes("qepage")) return (<QuestionEditPage statehandler={statehandler} user={props.user} qid={props.page.slice(6)}> </QuestionEditPage>);
  if (props.page.includes("tepage")) return (<TagEditPage statehandler={statehandler} user={props.user} tid={props.page.slice(6)}> </TagEditPage>);
  if (props.page.includes("aepage")) return (<AnswerEditPage statehandler={statehandler} user={props.user} aid={props.page.slice(6)}> </AnswerEditPage>);
  return ("");
}

export default class Mainbody extends React.Component {
  constructor(props) {
    super(props);
    //States for pages:
    //qpage,answerspage,tpage,searchpage,qerrors,aerrors,qaskpage,tlinkpage
    this.state = { page: props.page, user: props.user };
  }

  render() {
    let statehandler = this.props.statehandler;
    return (
      <RenderPage page={this.props.page} statehandler={statehandler} user={this.props.user} />);
  }


}
