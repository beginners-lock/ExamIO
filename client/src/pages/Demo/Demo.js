import React, { useState } from "react";
import HomeNav from "../../components/HomeNav";
// import ExamTimer from "../../components/ExamTimer";
import Timing from "../../components/Timing";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { useEffect } from "react";

const Demo = () => {
  let [page, setPage] = useState(0);
  let [questionNums, setQuestionNums] = useState([1, 2, 3, 4, 5]);
  //let [answersArr, setAnswersArr] = useState([]);
  let [userAnswers, setUserAnswers] = useState([]);
  let [correctAnswers, setCorrectAnswers] = useState([]);
  // let [totalScore, setTotalScore] = useState(0);

  const handlePageIncrease = () => {
    if (page === 2) {
      setPage(2);
    } else {
      setPage(page + 1);
      const newNums = questionNums.map((num) => {
        return num + 5;
      });
      setQuestionNums(newNums);
    }
  };

  const handlePageDecrease = () => {
    if (page === 0) {
      setPage(0);
    } else {
      setPage(page - 1);
      const newNums = questionNums.map((num) => {
        return num - 5;
      });
      setQuestionNums(newNums);
    }
  };

  const studentExam = `http://api.examio.feranmi.tech/api/student/take-exam?examId=9f07d69e-c8c3-4751-b497-65933a455ab9&page=${page}`;

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const getExam = () => {
      fetch(studentExam, {
        method: "GET",
        headers: {
          Authorization: "6a57ac37-21cc-46f8-9297-da754fe3972c",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          console.log(response.answers);
          setExams(response.questions);
        });
    };
    getExam();
  }, [studentExam]);

  /*function updateCorrectAnswers(response){
    let arr = correctAnswers;
    arr.concat(response.answers);
    setCorrectAnswers(arr);
  }*/

  function updateUsersAnswers(el, answer, index){
      let arr = userAnswers;
      arr[index-1] = answer;
      setUserAnswers(arr);
      console.log(userAnswers);
  }

  function submitTest(){
    /*for(let i=1; i<=3; i++){
      fetch(`http://api.examio.feranmi.tech/api/student/take-exam?examId=9f07d69e-c8c3-4751-b497-65933a455ab9&page=${i}`, {
        method: "GET",
        headers: {
          Authorization: "6a57ac37-21cc-46f8-9297-da754fe3972c",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response.json();
      }).then((response) => {
        let arr = correctAnswers;
        arr.concat(response.answers);
        setCorrectAnswers(arr);
        if(i===3){
          console.log(correctAnswers);
        }
      });
      
    }*/
    console.log(correctAnswers);
    //let score = 0;
  }

  return (
    <div>
      <HomeNav />
      <Timing />
      <div className="bg-lightColor pb-[5rem]">
        <h3 className="px-10 md:px-20 font-bold pb-5">Subject: Chemistry</h3>
        <p className="mx-auto text-center rounded-lg text-sm font-semibold mb-10 px-3 py-1 bg-examiopurple border w-[30%] text-lightColor">
          Questions
        </p>
        {exams.map((question) => {
          return(
          <div className="px-10 md:px-20 text-center">
            <h4 className="text-base">
              {" "}
              <span className="mr-3 rounded-full bg-buttonColor px-1 text-lightColor text-sm font-extrabold" onClick={()=>{console.log(userAnswers[ questionNums[exams.indexOf(question)]-1 ]);}}>
                {questionNums[exams.indexOf(question)]}
              </span>
              {question.question}
            </h4>
            <div className="py-3 flex items-center gap-1 ml-10 font-bold pb-[2.5rem] justify-center">
              <span>(A)</span>
              {
                userAnswers[ questionNums[exams.indexOf(question)]-1 ] === 0?
                  <input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 0, questionNums[exams.indexOf(question)]);}} checked/>
                :<input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 0, questionNums[exams.indexOf(question)]);}}/>
              }
              <label>{question.options[0].text}</label>

              <span className="ml-2">(B)</span>
              {
                userAnswers[ questionNums[exams.indexOf(question)]-1 ] === 1?
                  <input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 1, questionNums[exams.indexOf(question)]);}} checked/>
                :<input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 1, questionNums[exams.indexOf(question)]);}}/>
              }
              <label>{question.options[1].text}</label>

              <span className="ml-2">(C)</span>
              {
                userAnswers[ questionNums[exams.indexOf(question)]-1 ] === 2?
                  <input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 2, questionNums[exams.indexOf(question)]);}} checked/>
                :<input type="radio" name={questionNums[exams.indexOf(question)]} onChange={(e)=>{updateUsersAnswers(e.target, 2, questionNums[exams.indexOf(question)]);}}/>
              }
              <label>{question.options[2].text}</label>
            </div>
          </div>);
        })}
      </div>

      <div className="flex flex-row px-10 md:px-20 py-5 justify-between text-lightColor">
        <div
          className="flex items-center gap-1 cursor-pointer md:hover:bg-buttonColor md:hover:px-5"
          onClick={handlePageDecrease} style={{visibility:page===0?'hidden':'visible'}}
        >
          <AiFillCaretLeft />
          Previous
        </div>
        <div className="flex items-center gap-1 cursor-pointer md:hover:bg-buttonColor md:hover:px-5" style={{display:page===2?'flex':'none'}} onClick={()=>{submitTest();}}>
          <BsFillSendFill />
          Submit
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer md:hover:bg-buttonColor md:hover:px-5"
          onClick={handlePageIncrease} style={{visibility:page===2?'hidden':'visible'}}
        >
          <AiFillCaretRight />
          Next
        </div>
      </div>
    </div>
  );
};

export default Demo;
