package com.revature.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@Service
public class TokenService {

    private Environment env;

    @Autowired
    public TokenService(Environment env){

        this.env = env;

    }

    public String generateToken(Map<String, String> claimsMap){

        String key = env.getProperty("jwt-secret-key");

        Key decodedKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));

        JwtBuilder builder = Jwts.builder()
                .issuer("revature")
                .subject("authentication")
                .issuedAt(Date.from(Instant.now().plus(Duration.ofDays(7))));

        Set<String> claimKeys = claimsMap.keySet();
        for(String claimKey : claimKeys){
            builder.claim(claimKey, claimsMap.get(claimKey));
        }

        return builder.signWith(decodedKey, SignatureAlgorithm.HS256).compact();

    }

    public boolean verifyToken(String token){
        SecretKeySpec secretKeySpec = new SecretKeySpec(env.getProperty("jwt-secret-key")
                .getBytes(), SignatureAlgorithm.HS256.getJcaName());

        JwtParser parser = Jwts.parser()
                .verifyWith(secretKeySpec)
                .build();

        parser.parse(token);
        return true;
    }

    public Jws<Claims> parseToken(String token){
        String key = env.getProperty("jwt-secret-key");
        SecretKey decodedKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(key));

        Jws<Claims> claims = Jwts.parser()
                .verifyWith(decodedKey)
                .build()
                .parseSignedClaims(token);
        return claims;
    }

}
