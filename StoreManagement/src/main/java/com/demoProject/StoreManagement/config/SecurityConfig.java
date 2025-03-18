package com.demoProject.StoreManagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        //disable csrf
////        http.csrf(customizer -> customizer.disable());
////        http.csrf(AbstractHttpConfigurer::disable);
////
////        //for authorized every request
////        http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
////
////        //enable spring form log in
////        //disable form login for stateless session
////        //http.formLogin(Customizer.withDefaults());
////        //http.formLogin(customizer -> withDefaults());
////
////        //to do that at postman
////        //http.httpBasic(customizer -> customizer.disable());
////        http.httpBasic(Customizer.withDefaults());
////
////        //stateless session
////        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//
//        //this all are for disable csrf.
////        Customizer<CsrfConfigurer<HttpSecurity>> csrfCsrf = new Customizer<CsrfConfigurer<HttpSecurity>>() {
////            @Override
////            public void customize(CsrfConfigurer<HttpSecurity> httpSecurityCsrfConfigurer) {
////                httpSecurityCsrfConfigurer.disable();
////            }
////        };
////        http.csrf(csrfCsrf);
//
//
////        return http.build();
//    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
//                 .csrf(customizer -> customizer.disable())
                 .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request.anyRequest().authenticated())
                .httpBasic(withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();

    }

//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:5173"));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }

}
