function createTwoDocuments(foodGroupName, foodDescription, mealName) {
    var context = getContext();
    var container = context.getCollection();
    var firstItem = {
        foodGroup: foodGroupName,
        description: foodDescription
    };
    var secondItem = {
        foodGroup: foodGroupName + "_meal",
        eaten: {
            meal: mealName
        }
    };
    var firstAccepted = container.createDocument(container.getSelfLink(), firstItem, 
        function (firstError, newFirstItem) {
            if (firstError) throw new Error('Error' + firstError.message);
            console.log('Created: ' + newFirstItem.id);
            var secondAccepted = container.createDocument(container.getSelfLink(), secondItem,
                function (secondError, newSecondItem) {
                    if (secondError) throw new Error('Error' + secondError.message); 
                    console.log('Created: ' + newSecondItem.id);                   
                    context.getResponse().setBody({
                        foodRecord: newFirstItem,
                        mealRecord: newSecondItem
                    });
                }
            );
            if (!secondAccepted) return;    
        }
    );
    if (!firstAccepted) return;    
}