package tk.mybatis.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Application extends WebMvcConfigurerAdapter {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("/index.html");
		registry.addViewController("/trainees/**").setViewName("/index.html");	
		registry.addViewController("/occupations/**").setViewName("/index.html");
		registry.addViewController("/assessment/**").setViewName("/index.html");
		registry.addViewController("/assessResult/**").setViewName("/index.html");
		registry.addViewController("/occupationAnalyze/**").setViewName("/index.html");
		registry.addViewController("/assessConstrast/**").setViewName("/index.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
