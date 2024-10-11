package com.inhatc.flightmore.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class NaverId {
    @Column(nullable = false,name="server_id")
    private String serverId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name="server_type")
    private ServerType serverType;

    public String serverId(){
        return serverId;
    }

    public ServerType serverType(){
        return serverType;
    }
}
