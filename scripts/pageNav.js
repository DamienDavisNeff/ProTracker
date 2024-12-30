const headerConfig = {
    "video":{
        "element":GetElementFromLinkID("video"),
        "section":document.getElementById("video"),
    },
    "sound":{
        "element":GetElementFromLinkID("sound"),
        "section":document.getElementById("sound"),
    },
    "ui":{
        "element":GetElementFromLinkID("ui"),
        "section":document.getElementById("ui"),
    },
    "keyboard":{
        "element":GetElementFromLinkID("keyboard"),
        "section":document.getElementById("keyboard"),
    },
    "keybinds":{
        "element":GetElementFromLinkID("keybinds"),
        "section":document.getElementById("keybinds"),
    },
    "account":{
        "element":GetElementFromLinkID("account"),
        "section":document.getElementById("account"),
    },
}

const subsectionConfig = {
    "0video":{
        "element":GetElementFromSubsectionID("0video"),
        "section":document.getElementById("0a"),
        "id":"0a",
    },
    "1video":{
        "element":GetElementFromSubsectionID("1video"),
        "section":document.getElementById("1a"),
        "id":"1a",
    },
    "2video":{
        "element":GetElementFromSubsectionID("2video"),
        "section":document.getElementById("2a"),
        "id":"2a",
    },
    "3video":{
        "element":GetElementFromSubsectionID("3video"),
        "section":document.getElementById("3a"),
        "id":"3a",
    },
}

async function OnSectionNav(clickedSubsection, scroll, activeSubsection = GetActiveSubsection(), activeTab = GetActiveTab()) {
    if(scroll === null) scroll = true;
    const subsectionID = clickedSubsection.getAttribute("subsection-id");
    const activeSubsectionID = activeSubsection.getAttribute("subsection-id");
    activeSubsection.classList.remove("active");
    if(scroll) GoTo(`#${subsectionConfig[subsectionID].id}`,"_current");
    subsectionConfig[subsectionID].element.classList.add("active");
}

function GetActiveSubsection(activeTab = GetActiveTab()) {
    const activeLinkID = activeTab.getAttribute("link-id");
    const currentSection = headerConfig[activeLinkID].section;
    const allSections = currentSection.getElementsByClassName("nav-item");
    for(let a = 0; a < allSections.length; a++) {
        const currentSection = allSections[a];
        const currentSectionClasses = currentSection.classList;
        if(currentSectionClasses.value.includes("active")) return currentSection;
    } 
    return null;
}

function GetElementFromSubsectionID(subsectionID, activeTab = GetActiveTab()) {
    const activeLinkID = activeTab.getAttribute("link-id");
    const currentSection = headerConfig[activeLinkID].section;
    const allSections = currentSection.getElementsByClassName("nav-item");
    for(let a = 0; a < allSections.length; a++) {
        const currentSection = allSections[a];
        if(currentSection.getAttribute("subsection-id") === subsectionID) return currentSection;
    }
    return null;
}

async function OnHeaderNav(clickedTab,activeTab = GetActiveTab()) {
    const linkID = clickedTab.getAttribute("link-id");
    const activeLinkID = activeTab.getAttribute("link-id");
    activeTab.classList.remove("active");
    headerConfig[activeLinkID].section.classList.add("inactive-object");
    clickedTab.classList.add("active");
    headerConfig[linkID].section.classList.remove("inactive-object");
}

function GetActiveTab() {
    const allTabs = document.getElementsByClassName("tab");
    for(let a = 0; a < allTabs.length; a++) {
        const currentTab = allTabs[a];
        const currentTabClasses = currentTab.classList;
        if(currentTabClasses.value.includes("active")) return currentTab;
    }
    return null;
}

function GetElementFromLinkID(linkID) {
    const allTabs = document.getElementsByClassName("tab");
    for(let a = 0; a < allTabs.length; a++) {
        const currentTab = allTabs[a];
        if(currentTab.getAttribute("link-id") === linkID) return currentTab;
    }
    return null;
}

function GetClosestSubsection(activeTab = GetActiveTab()) {
    closestDistance = Infinity;
    closestElement = null;
    activeLinkID = activeTab.getAttribute("link-id");
    activeSubsection = headerConfig[activeLinkID].section;
    optionHeaders = activeSubsection.querySelectorAll(".header");
    for(let a = 0; a < optionHeaders.length; a++) {
        if(!IsVisible(optionHeaders[a])) continue;
        currentDistance = 10-optionHeaders[a].getBoundingClientRect().y;
        if(Math.abs(currentDistance) < closestDistance) {
            closestDistance = currentDistance;
            closestElement = optionHeaders[a];
        }
    }
    return closestElement;
}

function DisplayCurrentSubsection(closestSubsection = GetClosestSubsection()) {
    subsectionID = undefined;
    try {
        const subsectionID = closestSubsection.getAttribute("id");
    } catch(error) {
        subsectionID = null;
        return;
    } if(subsectionID === null || subsectionID === undefined) return;
    currentElement = null;
    for(let a = 0; a < Object.keys(subsectionConfig).length; a++) {
        if(subsectionConfig[Object.keys(subsectionConfig)[a]].id == subsectionID) {
            currentElement = subsectionConfig[Object.keys(subsectionConfig)[a]];
            break;
        }
    }
    OnSectionNav(currentElement.element, false);
} DisplayCurrentSubsection();

function DisplayDescription(hoveredElement, activeSubsection = GetActiveSubsection()) {
    hoveredID = hoveredElement.getAttribute("id");
    if(hoveredID === null) return;
    currentDescription = GetActiveDescription();
    // get target desc
    const allDescriptions = document.querySelectorAll(".descriptionParent");
    targetDescription = null;
    for(let a = 0; a < allDescriptions.length; a++) {
        if(allDescriptions[a].getAttribute("id") == hoveredID) {
            targetDescription = allDescriptions[a];
            break;
        }
    }
    console.log(currentDescription);
    if(targetDescription === null || targetDescription === undefined) return;
    currentDescription.classList.add("inactive-object");
    targetDescription.classList.remove("inactive-object");
    console.log(targetDescription);
}

function GetActiveDescription(activeTab = GetActiveTab(), activeSubsection = GetActiveSubsection()) {
    
    linkID = activeTab.getAttribute("link-id");
    activeSection = headerConfig[linkID].section;
    allDescriptions = activeSection.querySelectorAll(".descriptionParent");
    currentDescription = null;
    for(let a = 0; a < allDescriptions.length; a++) {
        description = allDescriptions[a];
        currentSectionClasses = description.classList;
        console.log(currentSectionClasses.value.includes("inactive-object"))
        if(currentSectionClasses.value.includes("inactive-object")) continue;
        currentDescription = description;
        console.log(description)
        break;
    }
    return currentDescription;
} GetActiveDescription()

/* 
function GetActiveSubsection(activeTab = GetActiveTab()) {
    const activeLinkID = activeTab.getAttribute("link-id");
    const currentSection = headerConfig[activeLinkID].section;
    const allSections = currentSection.getElementsByClassName("nav-item");
    for(let a = 0; a < allSections.length; a++) {
        const currentSection = allSections[a];
        const currentSectionClasses = currentSection.classList;
        if(currentSectionClasses.value.includes("active")) return currentSection;
    } 
    return null;
}
*/

document.addEventListener("scroll", () => {
    DisplayCurrentSubsection();
})

document.querySelectorAll(".option").forEach(item => {
    item.addEventListener('mouseover', () => {
        DisplayDescription(event.currentTarget);
    })
})

document.querySelectorAll("#header .tab").forEach(item => {
    item.addEventListener("click", () => {
        OnHeaderNav(event.currentTarget);
    })
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        OnSectionNav(event.currentTarget, true)
    })
})