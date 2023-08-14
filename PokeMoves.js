let moveList = {};
const CATEGORY_LINKS = {
    "physical": '<img class="category-icon" title="Physical" src="images/move-physical.png">',
    "special": '<img class="category-icon" title="Special" src="images/move-special.png">',
    "status": '<img class="category-icon" title="Status" src="images/move-status.png">'
};

window.onload = async function() {
    for (let i=1; i<900; i++){
        await getMove(i);
    }
}

async function getMove(num){
    let url = `https://pokeapi.co/api/v2/move/${num}`;
    console.log(url);
    let res = await fetch(url);
    let move = await res.json();
    let newRow = await createRow(move);
    document.getElementById("moveList").getElementsByTagName('tbody')[0].append(newRow);
}

async function createRow(move){
    let {"id":num, "name":name, "type":{name:type}, "power":dmg, "accuracy":acc, "damage_class":{name:category} } = move;//grabbing elements from json
    name = name.split('--')[0];
    name = name.replace('-',' ')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    if (dmg == null){
        dmg = '-';
    }
    if (acc == null){
        acc = '-';
    }
    else{
        acc.toString().concat('%');
    }
    moveList[num] = {"name":name, "type":type, "dmg":dmg, "acc":acc, "category":category};//adding move to moveList 
    //console.log(`${name}:\n${dmg} damage\n${type} type\n${acc} accuracy\n${dmgClass} type`);
    
    //create row
    let row = document.createElement("tr");
    row.id = num;
    row.classList.add("move-row");
    //insert cells
    let nameCell = row.insertCell();
    let typeCell = row.insertCell();
    let dmgCell = row.insertCell();
    let accCell = row.insertCell();
    let categoryCell = row.insertCell();
    //fill in cells
    nameCell.textContent = name;
    typeCell.textContent = type;
    typeCell.classList.add("type-icon");
    typeCell.classList.add(`type-${type}`);
    dmgCell.textContent = dmg;
    accCell.textContent = acc;
    categoryCell.innerHTML = CATEGORY_LINKS[category];
    return row;
}

function updateList(){
    let search, filter, table, tr;
    search = document.getElementById('moveSearch');
    filter = search.value.toLowerCase();
    table = document.getElementById("moveList");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName('tr');

    //Hide all rows except first that dont match search query
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } 
        else {
            tr[i].style.display = "none";
        }
    }
}