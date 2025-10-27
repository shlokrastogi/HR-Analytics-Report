// Variables
const sortedData = document.getElementById('sorted-data');
const summaryData = document.getElementById('summary-data');
const salaryData = document.getElementById('salary-data');
const table = document.querySelector('table');
const container = document.querySelector('.container');

let sortedEmployees = [];
let totalExpenditure = null;

function bonus(salary, experience) {
    return salary * 0.10 * experience;
}

fetch('data.json')
.then (res => res.json())
.then (data => {
    sortedEmployees = data.sort((a,b) => b.salary - a.salary);



    sortedData.addEventListener('click', (e) => {

        if (totalExpenditure) {totalExpenditure.remove();}

        table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Experience</th>
        </tr>
        `

        sortedEmployees.forEach(emp => {
            
            
            const row = table.insertRow();
            row.insertCell(0).textContent = emp.id;
            row.insertCell(1).textContent = emp.name;
            row.insertCell(2).textContent = emp.department;
            row.insertCell(3).textContent = emp.salary;
            row.insertCell(4).textContent = emp.experience;
            // row.insertCell(5).textContent = bonus(emp.salary, emp.experience);


        });

    });


    summaryData.addEventListener('click', (e) => {

        if (totalExpenditure) {totalExpenditure.remove();}

        table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Bonus</Bonus>
        </tr>
        `

        sortedEmployees.forEach(emp => {
            
            if (emp.experience >= 3) {
            
                const row = table.insertRow();

                row.insertCell(0).textContent = emp.name;
                row.insertCell(1).textContent = emp.department;
                row.insertCell(2).textContent = bonus(emp.salary, emp.experience);

            }
        });
            

    });


    salaryData.addEventListener('click', (e) => {
        table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Experience</th>
            <th>Bonus</th>
        </tr>
        `
        
        let sum = 0;

        sortedEmployees.forEach(emp => {
            
            
            if (emp.experience >= 3) {

                sum += emp.salary;
            
                const row = table.insertRow();

                row.insertCell(0).textContent = emp.id;
                row.insertCell(1).textContent = emp.name;
                row.insertCell(2).textContent = emp.department;
                row.insertCell(3).textContent = emp.salary;
                row.insertCell(4).textContent = emp.experience;
                row.insertCell(5).textContent = bonus(emp.salary, emp.experience);

            }

        });

        if (totalExpenditure) {totalExpenditure.remove();}

        totalExpenditure = document.createElement('h4');
        totalExpenditure.innerHTML = `Total Expenditure: ${sum}`;
        container.appendChild(totalExpenditure);
        totalExpenditure.style.fontSize = '1.5rem';
        totalExpenditure.style.margin = '20px auto';
        totalExpenditure.style.color = 'white';
        totalExpenditure.style.backgroundColor = 'black';
        totalExpenditure.style.padding = '20px';


    });

}).catch(err => {
    console.log("error in the JSON loading:", err);
});