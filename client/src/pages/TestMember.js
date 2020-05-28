import React, { useState, useEffect } from "react";
import API from "../utils/API";

function TestMember() {

    const [user, setUser] = useState({
        email: "",
        name: "",
        teachers: [],
        school: ""
    });

    useEffect(() => {    
        API.getStudentData()
            .then(res => {
                console.log(res);
                setUser({
                    ...user,
                    email: res.data.email,
                    name: res.data.name,
                    teachers: res.data.teachers,
                    school: res.data.school,
                    id: res.data.id
                })

            })
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome { user.name }!</p>
            <p>School: { user.school }</p>
            <p>Teachers: { user.teachers ? user.teachers.join(", ") : "" }</p>
        </div>
    );
}

export default TestMember;