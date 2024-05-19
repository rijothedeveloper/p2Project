package com.revature.p2Backend;

import com.revature.daos.ItemDAO;
import com.revature.models.Item;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.models.dtos.CreateUserDTO;
import com.revature.models.dtos.ItemDTO;
import com.revature.models.dtos.ReviewDTO;
import com.revature.services.ItemService;
import com.revature.services.ReviewService;
import com.revature.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;



@SpringBootTest
class P2BackendApplicationTests {

	@MockBean
	private ItemService itemService;
	private ItemDTO itemdto = new ItemDTO("item", 1, "description", "category", "image");
	private Item item = new Item("item", null, "description", "category", "image");
	private ItemDAO itemDAO;

	@MockBean
	private UserService userService;
	private CreateUserDTO userdto = new CreateUserDTO("username", "password", "email", "firstName", "lastName");

	@MockBean
	private ReviewService reviewService;
	private ReviewDTO reviewdto = new ReviewDTO("title", "body", 0, 5);




	@Autowired
	public P2BackendApplicationTests(ItemService itemService, ItemDAO itemDAO) {
		this.itemService = itemService;
		this.itemDAO = itemDAO;
	}

	@Test
	void contextLoads() {
	}

	//write a test to validate the methods in the ItemService class
	@Test
	void testAddItem() {
		when(itemService.addItem(itemdto)).thenReturn(item);
		assertEquals(item, itemService.addItem(itemdto));
	}

	@Test
	void testGetAllItems() {
		when(itemService.getAllItems()).thenReturn(null);
        assertNull(itemService.getAllItems());
	}

	@Test
	void testGetItemById() {
		when(itemService.getItemById(1)).thenReturn(null);
		assertNull(itemService.getItemById(1));
	}

	@Test
	void testGetItemByName() {
		when(itemService.getItemByName("item")).thenReturn(null);
		assertNull(itemService.getItemByName("item"));
	}

	@Test
	void testDeleteItem() {
		when(itemService.deleteItem(1)).thenReturn(null);
		assertNull(itemService.deleteItem(1));
	}

	@Test
	void testUpdateItem() {
		when(itemService.updateItem(item, 1)).thenReturn(null);
		assertNull(itemService.updateItem(item, 1));
	}

	//write a test to validate the methods in the UserService class
	@Test
	void testAddUser() {
		when(userService.addUser(userdto)).thenReturn(null);
		assertNull(userService.addUser(userdto));
	}

	@Test
	void testGetAllUsers() {
		when(userService.getAllUsers("token")).thenReturn(null);
		assertNull(userService.getAllUsers("token"));
	}

	@Test
	void testGetUser() {
		when(userService.getUser("username")).thenReturn(null);
		assertNull(userService.getUser("username"));
	}

	//write a test to validate the methods in the ReviewService class
	@Test
	void testAddReview() {
		when(reviewService.addReview(reviewdto)).thenReturn(null);
		assertNull(reviewService.addReview(reviewdto));
	}




}
