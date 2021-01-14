function selectedRowBackground(element) {
  if (element.checked) {
    selectedCounter++;
    outerParent.style.backgroundColor = "#8ec7fc";
    console.log("checked");
  } else {
    selectedCounter--;
    outerParent.style.backgroundColor = "#ffffff";
  }
}

export { selectedRowBackground };
