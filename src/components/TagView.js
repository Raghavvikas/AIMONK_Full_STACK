import React, { useState } from 'react';

const TagView = ({ tag, onAddChild, onChangeData, onCollapseToggle, setTree }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [tagName, setTagName] = useState(tag.name);
    const [editingName, setEditingName] = useState(false);
    const [dataValue, setDataValue] = useState(tag.data || "");

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNameChange = (e) => {
        if (e.key === "Enter") {
            tag.name = tagName;
            setEditingName(false);
            setTree((prevTree) => ({ ...prevTree }));
        }
    };

    const handleDataChange = (e) => {
        setDataValue(e.target.value);
        tag.data = e.target.value;
        setTree((prevTree) => ({ ...prevTree }));
    };

    const handleAddChild = () => {
        if (tag.data) {
            delete tag.data;
            tag.children = [{ name: "New Child", data: "Data" }];
        } else if (tag.children) {
            tag.children.push({ name: "New Child", data: "Data" });
        } else {
            tag.children = [{ name: "New Child", data: "Data" }];
        }
        setTree((prevTree) => ({ ...prevTree }));
    };

    return (
        <div className="tag-container">
            <div className="tag-header">
                <button className="toggle-button" onClick={toggleCollapse}>{isCollapsed ? ">" : "v"}</button>
                {editingName ? (
                    <input
                        type="text"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        onKeyPress={handleNameChange}
                    />
                ) : (
                    <span onClick={() => setEditingName(true)}>{tag.name}</span>
                )}
                <button onClick={handleAddChild}>Add Child</button>
            </div>

            {!isCollapsed && (
                <div className="tag-body">
                    {tag.children ? (
                        tag.children.map((child, index) => (
                            <TagView
                                key={index}
                                tag={child}
                                setTree={setTree}
                                onAddChild={onAddChild}
                            />
                        ))
                    ) : (
                        <div className="tag-data">
                            <label>Data: </label>
                            <input
                                type="text"
                                value={dataValue}
                                onChange={handleDataChange}
                                readOnly
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TagView;
