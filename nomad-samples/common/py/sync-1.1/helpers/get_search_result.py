def get_search_result():
    # Ask the user if they want to add a name or a search result field
    choice = input("Do you want to add a name or a search result field? (name/search): ").lower()

    if choice == "name":
        # If the user wants to add a name, prompt for the name and exit recursion
        name = input("Enter the name: ")
        return {"name": name}

    elif choice == "search":
        # If the user wants to add a search result field, prompt for search result details
        search_result_name = input("Enter the search result name: ")

        # Recursively call the function to add more search result fields
        search_result_fields = []
        search_result = get_search_result()
        search_result_fields.append(search_result)

        return {"name": search_result_name, "searchResultFields": search_result_fields}

    else:
        # Handle invalid input and recursively call the function again
        print("Invalid choice. Please enter 'name' or 'search'.")
        return get_search_result()

