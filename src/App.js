import React, { useState, useEffect } from 'react';
import TagView from './components/TagView';
import axios from 'axios';
import './App.css'

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" }
      ]
    },
    { name: "child2", data: "c2 World" }
  ]
};

function App() {
  const [trees, setTrees] = useState(initialTree);

  useEffect(() => {
    axios.get('/api/tags').then((res) => {
      setTrees(res.data);
      console.log(res.data, "testtt");
    }).catch(error => {
      console.error("There was an error!", error);
    });
  }, []);

  const handleAddChild = (parentTag, newChildName, newChildData) => {
    const addChildRecursively = (tag) => {
      if (tag.name === parentTag.name) {
        if (!tag.children) {
          tag.children = [];
        }
        tag.children.push({ name: newChildName, data: newChildData });
      } else if (tag.children) {
        tag.children.forEach(addChildRecursively);
      }
    };

    const updatedTrees = Object.assign(trees)?.map(tree => {
      const updatedTree = { ...tree };
      addChildRecursively(updatedTree.data);
      return updatedTree;
    });

    setTrees(updatedTrees);
  };

  const handleChangeData = (tagName, newData) => {
    const updateDataRecursively = (tag) => {
      if (tag.name === tagName) {
        tag.data = newData;
      } else if (tag.children) {
        tag.children.forEach(updateDataRecursively);
      }
    };

    const updatedTrees = Object.assign(trees)?.map(tree => {
      const updatedTree = { ...tree };
      updateDataRecursively(updatedTree.data);
      return updatedTree;
    });

    setTrees(updatedTrees);
  };

  const handleExport = () => {
    const jsonString = JSON.stringify(trees, null, 2);
    console.log(jsonString);

    // Save the updated data to the backend
    // trees.forEach((tree) => {
    //   axios.put(`/api/tags/${tree.id}`, { data: tree.data });
    // });

    // Send tree data to the backend (example API call)
    axios
      .post("http://localhost:8080/api/tags", { trees })
      .then((res) => console.log("Tree saved:", res.data))
      .catch((err) => console.error("Error saving tree:", err));
  };

  return (
    <div className='App'>

      <TagView
        tag={trees}
        onAddChild={handleAddChild}
        setTree={setTrees}
        onChangeData={handleChangeData}
        onCollapseToggle={() => { }}
      />
      <button className='export-button' onClick={handleExport}>Export</button>
    </div>
  );
}

export default App;
