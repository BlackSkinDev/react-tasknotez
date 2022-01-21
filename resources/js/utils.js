export function getSortedTask(oldTaskList, newTaskList) {
    const finalTaskList = [];
    oldTaskList.forEach((task1, index1) => {
        newTaskList.forEach((task2, index2) => {
            if (task1.id === task2.id && index1 !== index2) {
                finalTaskList.push({
                    id: task1.id,
                    sort_order: index2+1,
                    label: task1.label,
                });
            }
        });
    });

    return finalTaskList;
}

export function getSortedTask2(oldTaskList, newTaskList) {
    const finalTaskList = [];
    const taskMap = new Map();
    oldTaskList.forEach((task1, index) => {
        taskMap.set(task1.id, index);
    });

    newTaskList.forEach((task, index) => {
        const oldIndex = taskMap.get(task.id);
        if (oldIndex !== index) {
            finalTaskList.push({
                id: task.id,
                sort_order: index+1,
                label: task.label,
            });
        }
    });

    return finalTaskList;
}
