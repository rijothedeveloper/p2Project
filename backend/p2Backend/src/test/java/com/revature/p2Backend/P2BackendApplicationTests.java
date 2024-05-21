package com.revature.p2Backend;

import com.revature.daos.*;
import com.revature.models.*;
import com.revature.models.dtos.*;
import com.revature.services.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;



@SpringBootTest
class P2BackendApplicationTests {

	//Service mocks
	@MockBean
	private ItemService itemService;
	@MockBean
	private UserService userService;
	@MockBean
	private ReviewService reviewService;
	@MockBean
	private CollectionService collectionService;
	@MockBean
	private ScoreService scoreService;
	@MockBean
	private FollowService followService;
	@MockBean
	private ReplyService replyService;


	//DAO mocks
	@MockBean
	private ItemDAO itemDAO;
	@MockBean
	private UserDAO userDAO;
	@MockBean
	private ReviewDAO reviewDAO;
	@MockBean
	private FollowDAO followDAO;
	@MockBean
	private ScoreDAO scoreDAO;
	@MockBean
	private CollectionDAO collectionDAO;
	@MockBean
	private ReplyDAO replyDAO;


	//DTOs

	private CreateUserDTO userdto = new CreateUserDTO("username", "password", "email", "firstName", "lastName");
	private ReplyDTO replydto = new ReplyDTO(1,"body","firstName");
	private AddItemToCollectionDTO additemtocollectiondto = new AddItemToCollectionDTO(1, 1);
	private IncomingUserDTO incomingUserDTO = new IncomingUserDTO("username", "password");
	private ItemDTO itemDTO = new ItemDTO("item", 1, "description", "category", "image");
	private OutgoingUserDTO outgoingUserDTO = new OutgoingUserDTO(1, "username", "email", "firstName", "lastName","email@email.com", "timestamp");
	private ReviewDTO reviewdto = new ReviewDTO("title", "body", 0, 5);

	//Models
	private User user1 = new User(1,"username", "password", "email", "firstName", "lastName","role", "timestamp");
	private User user2 = new User(2,"username2", "password2", "email2", "firstName2", "lastName2","role2", "timestamp2");
	private Reply reply = new Reply(1,user1, null, null, null);
	private Item item = new Item("item", null, "description", "category", "image");
	private Review review = new Review(1, "title", "body", user1, item, 0, 5, null, null, null);
	private Collection collection = new Collection(new CollectionKey(item, user1));
	private Follow follow = new Follow(new FollowKey(user1, user2));
	private Score score = new Score(new ScoreKey(user1, review), 1);


	@MockBean
	private AuthenticationManager authenticationManager;



	@Autowired
	public P2BackendApplicationTests(ItemService itemService, ItemDAO itemDAO, UserService userService, ReviewService reviewService) {
		this.itemService = itemService;
		this.itemDAO = itemDAO;
	}

	@Test
	void contextLoads() {
	}

	//write a test to validate the methods in the ItemService class
	@Test
	void testItemService() {
		//test add item
		when(itemDAO.save(item)).thenReturn(item);
		assertEquals(item, itemService.addItem(itemDTO));

		//test get item
		when(itemDAO.findById(1)).thenReturn(java.util.Optional.of(item));
		assertEquals(item, itemService.getItemById(1));

		//test get all items
		List<Item> items = new ArrayList<>();
		items.add(item);
		when(itemDAO.findAll()).thenReturn(items);
		assertEquals(items, itemService.getAllItems());
	}

	//write a test to validate the methods in the UserService class
	@Test
	void testUserService() {
		//test add user
		when(userDAO.save(user1)).thenReturn(user1);
		assertEquals(user1, userService.addUser(userdto));

		//test get user
		when(userDAO.findById(1)).thenReturn(java.util.Optional.of(user1));
		assertEquals(user1, userService.findUserByUsername("username"));

		//test get all users
//		List<User> users = new ArrayList<>();
//		users.add(user1);
//		when(userDAO.findAll()).thenReturn(users);
//		assertEquals(users, userService.getAllUsers());

		//test login
		when(userDAO.findByUsernameAndPassword("username", "password")).thenReturn(user1);
		assertEquals(outgoingUserDTO, userService.login(incomingUserDTO));
	}

	//write a test to validate the methods in the ReviewService class
	@Test
	void testReviewService() {
		//test add review
		//when(reviewDAO.save(review)).thenReturn(review);
		//assertEquals(review, reviewService.addReview(reviewdto));

		//test get review
		//when(reviewDAO.findById(1)).thenReturn(java.util.Optional.of(review));
		//assertEquals(review, reviewService.getReviewById(1));

		//test get all reviews
		//List<Review> reviews = new ArrayList<>();
		//reviews.add(review);
		//when(reviewDAO.findAll()).thenReturn(reviews);
		//assertEquals(reviews, reviewService.getAllReviews());
	}

	//write a test to validate the methods in the CollectionService class
	@Test
	void testCollectionService() {
		//test add item to collection
		when(collectionDAO.save(collection)).thenReturn(collection);
		assertEquals(collection, collectionService.addItemToCollection(additemtocollectiondto));

		//test get collection
		List<Collection> collections = new ArrayList<>();
		collections.add(collection);
		when(collectionDAO.findByIdUserId(1)).thenReturn(collections);
		assertEquals(collections, collectionService.getCollection(1));
	}

	//write a test to validate the methods in the ScoreService class
	@Test
	void testScoreService() {
		//test new vote
		when(userDAO.findById(1)).thenReturn(java.util.Optional.of(user1));
		when(reviewDAO.findById(1)).thenReturn(java.util.Optional.of(review));
		when(scoreDAO.findById(new ScoreKey(user1, review))).thenReturn(java.util.Optional.of(score));
		assertEquals(review, scoreService.newVote(1, 1, 1));

		//test update vote
		when(scoreDAO.findById(new ScoreKey(user1, review))).thenReturn(java.util.Optional.of(score));
		assertEquals(review, scoreService.updateVote(1, 1, 1));
	}

	//write a test to validate the methods in the FollowService class
	@Test
	void testFollowService() {
		//test add follow
		when(followDAO.save(follow)).thenReturn(follow);
		assertEquals(follow, followService.followUser(follow.getId().getFollowingUser().getId(), follow.getId().getFollowedUser().getId()));

		//test get follow
		//when(followDAO.findAllByIdFollowerId(1)).thenReturn(Optional.of(follow));
		//assertEquals(follow, followService.getFollowing(1));
	}



}
