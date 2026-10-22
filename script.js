let  expenses=[];
let budget=0;
let nameInput=document.getElementById("name");           
let amountInput=document.getElementById("amount");
let categoryInput=document.getElementById("category");
let dateInput=document.getElementById("date");
let expenseList=document.getElementById("expenseList");
let message=document.getElementById("message");                        
document.getElementById("form").addEventListener("submit",function(event){         
    event.preventDefault();                  
    let name=nameInput.value;
    let amount=Number(amountInput.value);
    let category=categoryInput.value;   
    let date=dateInput.value;
    if(name==""||amount<=0||category==""||date==""){           
        message.textContent="Please Enter valid details";
    }
    else{
        let expense={               
            name:name,
            amount:amount,
            category:category,
            date:date
        };                          
        expenses.push(expense);   
        message.textContent="expense added successfully";
        showExpenses();                 
        updateTotal();
        updateCategory();
        updateBudget();
        saveData();
        document.getElementById("form").reset();
    }
});
function showExpenses(){
    expenseList.innerHTML="";           
    if(expenses.length==0){        
        expenseList.textContent="No expense recorded";
    }else{
        expenses.forEach(function(expense,index){  
            let li=document.createElement("li");   
            li.textContent=expense.name+" "+expense.amount;
            let button=document.createElement("button");
            button.textContent="Delete";
            button.addEventListener("click",function(){
                expenses.splice(index,1);           
                showExpenses();                
        updateTotal();
        updateCategory();
        updateBudget();
        saveData();
            });
li.appendChild(button);       
expenseList.appendChild(li);
        });
}
}
function updateTotal(){
    let total=0;
    expenses.forEach(function(expense){
        let month=expense.date.substring(0,7);        
        let currentMonth=new Date().toISOString().substring(0,7)   
     if (month==currentMonth){          
        total=total+expense.amount
     }
    });
    document.getElementById("total").textContent=total;
}

function updateCategory(){             
    let food=0;
    let travel=0;
    let shopping=0;
    let other=0;
    expenses.forEach(function(expense){
         let month=expense.date.substring(0,7);          
        let currentMonth=new Date().toISOString().substring(0,7);    
     if (month==currentMonth){ 
        if (expense.category=="Food"){
            food=food+expense.amount;
        }else if(expense.category=="Travel"){
            travel=travel+expense.amount;
        }else if(expense.category=="Shopping"){
            shopping=shopping+expense.amount;
        }else if(expense.category=="Other"){
            other=other+expense.amount;
        }
    }
});
document.getElementById("foodTotal").textContent=food;         
document.getElementById("travelTotal").textContent=travel;
document.getElementById("shopingTotal").textContent=shopping;
document.getElementById("otherTotal").textContent=other;
}
document.getElementById("saveBudget").addEventListener("click",function(){    
        let amount=Number(document.getElementById("budget").value);  
    if(amount<=0){
        alert("Enter a valid budget");
    }else{
        budget=amount;             
        updateBudget();
        saveData();
    }
});
function updateBudget(){      
    let total=Number(document.getElementById("total").textContent)
    let remaining=budget-total;
    document.getElementById("budgetDisplay").textContent=budget;
    document.getElementById("remaining").textContent=remaining;
    if(remaining<0){
        document.getElementById("warning").textContent="Warning! You exceed your budget";
    }else{document.getElementById("warning").textContent="";}
}
function saveData(){
localStorage.setItem("expenses",JSON.stringify(expenses));   
localStorage.setItem("budget",budget);     
}
function loadData(){
    let savedExpenses=localStorage.getItem("expenses");
    let savedBudget=localStorage.getItem("budget");
    if(savedExpenses!=null){
        expenses=JSON.parse(savedExpenses);
    }
    if(savedBudget!=null){
        budget=Number(savedBudget);
    }
    showExpenses();                
        updateTotal();
        updateCategory();
        updateBudget();
}
loadData();