package com.shopease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shopease.model.Address;
import com.shopease.model.User;

public interface AddressRepository extends JpaRepository<Address,Long>{

    // public Address findByUserAndAddressType(User user, AddressType addressType);

}
