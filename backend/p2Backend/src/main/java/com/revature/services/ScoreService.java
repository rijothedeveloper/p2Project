package com.revature.services;


import com.revature.daos.ReviewDAO;
import com.revature.daos.ScoreDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Review;
import com.revature.models.Score;
import com.revature.models.ScoreKey;
import com.revature.models.User;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.CannotProceedException;
import java.rmi.AlreadyBoundException;
import java.util.Optional;

@Service
public class ScoreService {

    private ScoreDAO scoreDAO;
    private UserDAO userDAO;
    private ReviewDAO reviewDAO;

    @Autowired
    public ScoreService(ScoreDAO scoreDAO, UserDAO userDAO, ReviewDAO reviewDAO) {
        this.scoreDAO = scoreDAO;
        this.userDAO = userDAO;
        this.reviewDAO = reviewDAO;
    }

    public Review newVote(int reviewId, int userId, int vote) {

        Optional<User> user = userDAO.findById(userId);
        Optional<Review> review = reviewDAO.findById(reviewId);

        if (user.isEmpty() || review.isEmpty())
            throw new NullPointerException("Unable to create vote for user " + userId + " and review " + reviewId);

        ScoreKey key = new ScoreKey(user.get(), review.get());

        if (scoreDAO.findById(key).isPresent()) {
            throw new IllegalArgumentException("User has already voted on this review, cannot create a new vote");
        }

        if (Math.abs(vote) >1) {
            throw new IllegalArgumentException("Cannot vote with a magnitude greater than one");
        }

        review.get().setScore( review.get().getScore() + vote);
        scoreDAO.save(new Score(key, vote));
        return reviewDAO.save(review.get());
    }

    public Review updateVote(int reviewId, int userId, int vote) {

        Optional<User> user = userDAO.findById(userId);
        Optional<Review> review = reviewDAO.findById(reviewId);

        if (user.isEmpty() || review.isEmpty())
            throw new NullPointerException("Unable to update vote for user " + userId + " and review " + reviewId);

        ScoreKey key = new ScoreKey(user.get(), review.get());

        Optional<Score> score = scoreDAO.findById(key);
        if (score.isEmpty())
            throw new NullPointerException("No vote to update");
        if (Math.abs(vote) >1) {
            throw new IllegalArgumentException("Cannot vote with a magnitude greater than one");
        }
        if (score.get().getVote() == vote)
            throw new IllegalArgumentException("New vote must be different from old vote");

        review.get().setScore( review.get().getScore() + vote - score.get().getVote());
        scoreDAO.save(new Score(key, vote));
        return reviewDAO.save(review.get());

    }

    public int getUserVote(int reviewId, int userId) {

        Optional<User> user = userDAO.findById(userId);
        Optional<Review> review = reviewDAO.findById(reviewId);

        if (user.isEmpty() || review.isEmpty())
            throw new NullPointerException("Missing user or review, please ensure these are not null");

        ScoreKey key = new ScoreKey(user.get(), review.get());

        Optional<Score> score = scoreDAO.findById(key);
        if (score.isEmpty())
            throw new NullPointerException("No vote");
        return score.get().getVote();
    }

    public Review deleteVote(int reviewId, int userId) {

            Optional<User> user = userDAO.findById(userId);
            Optional<Review> review = reviewDAO.findById(reviewId);

            if (user.isEmpty() || review.isEmpty())
                throw new NullPointerException("Unable to delete vote for user " + userId + " and review " + reviewId);

            ScoreKey key = new ScoreKey(user.get(), review.get());

            Optional<Score> score = scoreDAO.findById(key);
            if (score.isEmpty())
                throw new NullPointerException("No vote to delete");

            review.get().setScore( review.get().getScore() - score.get().getVote());
            userDAO.findById(userId).get().getScores().remove(score.get());
            reviewDAO.findById(reviewId).get().getScores().remove(score.get());
            scoreDAO.delete(score.get());
            return reviewDAO.save(review.get());
    }
}
