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

const subsetionConfig = {
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
    const subsectionID = clickedSubsection.getAttribute("subsectionID");
    const activeSubsectionID = activeSubsection.getAttribute("subsectionID");
    activeSubsection.classList.remove("active");
    if(scroll) GoTo(`#${subsetionConfig[subsectionID].id}`,"_current");
    subsetionConfig[subsectionID].element.classList.add("active");
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
        if(currentSection.getAttribute("subsectionID") === subsectionID) return currentSection;
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

document.querySelectorAll("#header .tab").forEach(item => {
    item.addEventListener("click", () => {
        OnHeaderNav(event.currentTarget);
    })
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        OnSectionNav(event.currentTarget)
    })
})